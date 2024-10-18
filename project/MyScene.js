import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyGarden } from "./MyGarden.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyBee } from "./MyBee.js";
import { MyHive } from "./MyHive.js";
import { MyGrassField } from "./MyGrassField.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }

  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 1);
    this.panorama = new MyPanorama(this, new CGFtexture(this, "images/panorama.jpeg"));
    this.garden = new MyGarden(this, 5, 5, {x: 75, y: -25, z: -100});
    this.rockSet = new MyRockSet(this, 150, 5);
    this.bee = new MyBee(this, true, 0, 0.3, 0, 1);
    this.hive = new MyHive(this);
    this.hive.updatePollenDropOffPosition(-75, -21.5, -103.5);
    this.flowerWithClosestPickup = null;
    this.grassBladeShader = new CGFshader(this.gl, "shaders/grassBlade.vert", "shaders/grassBlade.frag");
    this.grassBladeShader.setUniformsValues({ timeFactor: 0, amplitude: 1, frequency: 0.75, phaseShift: 0.5, height: 5 });
    this.grassField = new MyGrassField(this, 200, this.grassBladeShader);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayPlane = true;
    this.displayPanorama = true;
    this.followBee = true;
    this.gardenRows = 5;
    this.gardenCols = 5;
    this.scaleFactor = 1;
    this.speedFactor = 1;

    this.enableTextures(true);

    this.textureGround = new CGFtexture(this, "images/grass.jpeg");
    this.materialGround = new CGFappearance(this);
    this.materialGround.setTexture(this.textureGround);
    this.materialGround.setTextureWrap('REPEAT', 'REPEAT');
    this.materialGround.setEmission(0.75, 0.75, 0.75, 1);

    // animation
    this.setUpdatePeriod(50); // **at least** 50 ms between animations

    this.appStartTime = Date.now(); // current time in milisecs

    this.startVal = 0;
    this.endVal = 0.3;
    this.animStartTimeSecs = 2;
    this.animDurationSecs = 1;
    this.length = (this.endVal - this.startVal);

    this.numAnimObjs = 1;

    this.animObjs = [
      this.bee,
    ];
  }

  getFlowerWithClosestPickup() {
    let flowerWithClosestPickup;
    let smallestDistanceToPickup = Infinity;

    for (let i = 0; i < this.garden.rows; i++) {
      for (let j = 0; j < this.garden.columns; j++) {
        let flower = this.garden.flowerMatrix[i][j];

        if (flower.pollenGrain === null) continue;

        let distanceToPickup = Math.sqrt((this.bee.position.x - flower.pollenPickupPosition.x) ** 2 + (this.bee.position.y - flower.pollenPickupPosition.y) ** 2 + (this.bee.position.z - flower.pollenPickupPosition.z) ** 2);
        if (distanceToPickup < smallestDistanceToPickup) {
          flowerWithClosestPickup = flower;
          smallestDistanceToPickup = distanceToPickup;
        }
      }
    }

    if (flowerWithClosestPickup === null) return this.garden.flowerMatrix[0][0];

    return flowerWithClosestPickup;
  }

  update(t)
  {
    var timeSinceAppStart = (t - this.appStartTime) / 1000.0;

    for (var i = 0; i < this.numAnimObjs; i++)
      this.animObjs[i].update(timeSinceAppStart);

    this.grassBladeShader.setUniformsValues({ timeFactor: t / 100 % 100 });

    this.checkKeys();

    if (this.bee.droppingPollen && (this.bee.velocity.x === 0 && this.bee.velocity.z === 0)) {
      this.bee.pollenGrain = null;
      this.hive.woodenFrameAndNestBase.placePollen();

      this.bee.resumePreviousMovement();
      this.bee.droppingPollen = false;
    } 

    // Update camera target
    if (this.followBee)
      this.camera.setTarget(vec3.fromValues(this.bee.position.x, this.bee.position.y, this.bee.position.z));
  }

  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;

    if (this.bee.pickingPollen) {
      if (this.gui.isKeyPressed("KeyP") && (this.bee.velocity.x === 0 && this.bee.velocity.z === 0)) {
        text += " P ";
        keysPressed = true;

        this.bee.pollenGrain = this.flowerWithClosestPickup.pollenGrain;
        this.flowerWithClosestPickup.pollenGrain = null;

        // Resume previous movement
        this.bee.resumePreviousMovement();
        this.bee.pickingPollen = false;
      }
    } else if (!this.bee.resumingMovement && !this.bee.droppingPollen) {
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
          text += " W ";
          keysPressed = true;
          // Accelerate
          this.bee.accelerate(1); // Adjust acceleration value as needed
        }

        if (this.gui.isKeyPressed("KeyA")) {
            text += " A ";
            keysPressed = true;
            // Turn left
            this.bee.turn(0.1); // Adjust turn angle as needed
        }

        if (this.gui.isKeyPressed("KeyS")) {
            text += " S ";
            keysPressed = true;
            // Decelerate
            this.bee.accelerate(-1); // Adjust deceleration value as needed
        }

        if (this.gui.isKeyPressed("KeyD")) {
            text += " D ";
            keysPressed = true;
            // Turn right
            this.bee.turn(-0.1); // Adjust turn angle as needed
        }

        if (!(this.bee.velocity.x === 0 && this.bee.velocity.z === 0) && this.bee.pollenGrain === null && this.gui.isKeyPressed("KeyF")) {
          text += " F ";
          keysPressed = true;

          this.flowerWithClosestPickup = this.getFlowerWithClosestPickup();

          this.bee.pickingPollen = true;

          // Move to destination
          this.bee.moveToDestination(this.flowerWithClosestPickup.pollenPickupPosition);
        }

        if (!(this.bee.velocity.x === 0 && this.bee.velocity.z === 0) && this.bee.pollenGrain !== null && this.gui.isKeyPressed("KeyO")) {
          text += " O ";
          keysPressed = true;

          const pollenDropOffPosition = this.hive.pollenDropOffPosition;

          this.bee.droppingPollen = true;

          // Move to destination
          this.bee.moveToDestination(pollenDropOffPosition);
        }

        if (this.gui.isKeyPressed("KeyR")) {
          text += " R ";
          keysPressed = true;
          // Reset position and velocity
          this.bee.position = { x: 0, y: 3, z: 0 };
          this.bee.orientation = 0;
          this.bee.velocity = { x: 0, y: 0, z: 0 };
        }
    }

    if (keysPressed)
        console.log(text);
  }

  updateSpeedFactor() {
    this.bee.updateSpeedFactor(this.speedFactor);
  }

  updateScaleFactor() {
    this.bee.updateScaleFactor(this.scaleFactor);
  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(5, 3, 0),
      vec3.fromValues(0, 3, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  updateGardenRows() {
    this.garden.updateRows(this.gardenRows);
  }

  updateGardenCols() {
    this.garden.updateCols(this.gardenCols);
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    // ---- BEGIN Primitive drawing section

    if (this.displayPanorama) {
      this.panorama.display();
    }

    this.bee.display();

    this.garden.display();

    this.pushMatrix();
    this.translate(0, -25, 0);
    if(this.displayPlane) {
      this.materialGround.apply();

      this.pushMatrix();
      this.scale(400, 400, 400);
      this.rotate(-Math.PI/2.0, 1, 0, 0);
      this.plane.display();
      this.popMatrix();
    }

    this.pushMatrix();
    this.translate(-75, 0, -100);
    this.rockSet.display();

    this.pushMatrix();
    this.translate(0, 3.5, -3.5);
    this.hive.display();
    this.popMatrix();
    this.popMatrix();

    this.pushMatrix();
    this.translate(-25, 0, 100);
    this.grassField.display();
    this.popMatrix();
    this.popMatrix();
  }
}
