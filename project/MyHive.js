import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyPrism } from './components/solids/MyPrism.js';
import { MySphere } from './components/solids/MySphere.js';
import { MyQuad } from './components/shapes/MyQuad.js';
import { MyCircle } from './components/shapes/MyCircle.js';
import { MySemiCircle } from './components/shapes/MySemiCircle.js';
import { MyBee } from './MyBee.js';
import { MyWoodenFrameAndNestBase } from './components/hive/MyWoodenFrame&NestBase.js';

export class MyHive extends CGFobject {
	constructor(scene) {
		super(scene);
        this.cube = new MyPrism(scene, 4, 25);
        this.triangularPrism = new MyPrism(scene, 3, 25);
        this.sphere = new MySphere(scene, 50, 25, false, 10);
        this.cylinder = new MyPrism(scene, 75, 25);
        this.circle = new MyCircle(scene, 1, 50);
        this.square = new MyQuad(scene);
        this.semiCircle = new MySemiCircle(scene, 1, 50);
        this.bee = new MyBee(scene, false);
        this.woodenFrameAndNestBase = new MyWoodenFrameAndNestBase(scene);

        this.pollenDropOffPosition = {x: 0, y: 3, z: -2};

        this.texture1 = new CGFtexture(this.scene, 'images/whiteWood.png');
        this.material1 = new CGFappearance(this.scene);
        this.material1.setAmbient(0.8157, 0.7255, 0.5294, 1.0);
        this.material1.setDiffuse(0.8157, 0.7255, 0.5294, 1.0);
        this.material1.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.material1.setTexture(this.texture1);
        this.material1.setTextureWrap('REPEAT', 'REPEAT');

        this.texture2 = new CGFtexture(this.scene, 'images/whiteWoodPlanks.png');
        this.material2 = new CGFappearance(this.scene);
        this.material2.setAmbient(0.7098, 0.8196, 0.4824, 1.0);
        this.material2.setDiffuse(0.7098, 0.8196, 0.4824, 1.0);
        this.material2.setSpecular(0.7098, 0.8196, 0.4824, 1.0);
        this.material2.setTexture(this.texture2);
        this.material2.setTextureWrap('REPEAT', 'REPEAT');

        this.texture3 = new CGFtexture(this.scene, 'images/whiteWood.png');
        this.material3 = new CGFappearance(this.scene);
        this.material3.setAmbient(0.7098, 0.8196, 0.4824, 1.0);
        this.material3.setDiffuse(0.7098, 0.8196, 0.4824, 1.0);
        this.material3.setSpecular(0.7098, 0.8196, 0.4824, 1.0);
        this.material3.setTexture(this.texture3);
        this.material3.setTextureWrap('REPEAT', 'REPEAT');

        this.material5 = new CGFappearance(this.scene);
        this.material5.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.material5.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.material5.setSpecular(0.0, 0.0, 0.0, 1.0);
	}

    updatePollenDropOffPosition(dx, dy, dz) {
        this.pollenDropOffPosition.x += dx;
        this.pollenDropOffPosition.y += dy;
        this.pollenDropOffPosition.z += dz;
    }
	
	display() {
        this.scene.pushMatrix();
        this.scene.translate(3.7, -2.2, 8);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.bee.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, 4, 3.5);
        this.scene.rotate(Math.PI/12, 0, 1, 0);
        this.scene.rotate(Math.PI/5, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/3, 0, 1, 0);
        this.bee.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.9, 5, 3);
        this.scene.rotate(-Math.PI/8, 0, 0, 1);
        this.scene.rotate(-Math.PI/4, 0, 1, 0);
        this.bee.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3.5, 0, -1.5);
        this.scene.rotate(-Math.PI/2.3, 1, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.woodenFrameAndNestBase.display();
        this.scene.popMatrix();

        this.material5.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 6.75, -0.005);
        this.scene.scale(0.75, 0.4, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.semiCircle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 3.25, -0.005);
        this.scene.scale(0.75, 0.4, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.semiCircle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-3.185, 6.75, 3.55);
        this.scene.scale(1, 0.4, 0.75);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.semiCircle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-3.185, 3.25, 3.55);
        this.scene.scale(1, 0.4, 0.75);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.semiCircle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3.185, 6.75, 3.55);
        this.scene.scale(1, 0.4, 0.75);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.semiCircle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3.185, 3.25, 3.55);
        this.scene.scale(1, 0.4, 0.75);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.semiCircle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 6.75, 7.075);
        this.scene.scale(0.75, 0.4, 1);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.semiCircle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 3.25, 7.075);
        this.scene.scale(0.75, 0.4, 1);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.semiCircle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-3.185, 7.2, 3.55);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(7.1, 0.05, 1);
        this.square.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3.185, 7.2, 3.55);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(7.1, 0.05, 1);
        this.square.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 7.2, -0.005);
        this.scene.scale(6.365, 0.05, 1);
        this.square.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 7.2, 7.08);
        this.scene.scale(6.365, 0.05, 1);
        this.square.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-3.185, 3.75, 3.55);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(7.1, 0.05, 1);
        this.square.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3.185, 3.75, 3.55);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(7.1, 0.05, 1);
        this.square.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 3.75, -0.005);
        this.scene.scale(6.365, 0.05, 1);
        this.square.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 3.75, 7.075);
        this.scene.scale(6.365, 0.05, 1);
        this.square.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 7.75, 7.08);
        this.scene.scale(0.2, 0.2, 1);
        this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.2, 7.075);
        this.scene.scale(1.4, 0.5, 1);
        this.semiCircle.display();
        this.scene.popMatrix();

        this.material3.apply();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 1.5, 7);
        this.scene.scale(2.3, 0.2, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 8.75, -0.5);
        this.scene.scale(0.25, 0.25, 8);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.cube.display();
        this.scene.popMatrix();

        this.material2.apply();

        this.scene.pushMatrix();
        this.scene.translate(-2, 7.825, -0.5);
        this.scene.rotate(Math.PI/7.125, 0, 0, 1);
        this.scene.scale(3, 0.15, 8);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, 7.825, -0.5);
        this.scene.rotate(-Math.PI/7.125, 0, 0, 1);
        this.scene.scale(3, 0.15, 8);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.cube.display();
        this.scene.popMatrix();

        this.material1.apply();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 7.65, 0);
        this.scene.scale(3.675, 1, 7.075);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.triangularPrism.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 7.15, 3.535);
        this.scene.scale(4.5, 7, 5);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
		this.scene.scale(5.3, 0.3, 9.5);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.cube.display();
        this.scene.popMatrix();
    }
}
