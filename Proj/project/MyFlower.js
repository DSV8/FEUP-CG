import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import { MyPetal } from './components/flower/MyPetal.js';
import { MyPollen } from './MyPollen.js';
import { MyReceptacle } from './components/flower/MyReceptacle.js';
import { MyStem } from './components/flower/MyStem.js';

export class MyFlower extends CGFobject {
	constructor(scene, flowerRadius, numPetals, petalsColor, receptacleRadius, receptacleColor, stemRadius, stemSize, stemColor, leavesColor) {
		super(scene);

        this.flowerRadius = flowerRadius;
        this.numPetals = numPetals;
        this.receptacleRadius = receptacleRadius;
        this.flowerHeadRotationAng = -(Math.random() * (Math.PI / 4));
        this.stemAdjustment = -((this.receptacleRadius / 2) * Math.cos(this.flowerHeadRotationAng));
        this.bodyRotationAng = Math.random() * (Math.PI / 2) - (Math.PI / 4);
        this.pollenGrainRotationX = Math.random() * (Math.PI / 2) - (Math.PI / 4);
        this.pollenGrainRotationY = Math.random() * 2 * Math.PI;

        this.receptacle = new MyReceptacle(this.scene);
        this.pollenGrain = new MyPollen(this.scene, 10, 5);
        this.petal = new MyPetal(this.scene);
        this.curvatures = Array.from({length: this.numPetals}, () => Math.random() * (Math.PI / 8));
        this.unionAngs = Array.from({length: this.numPetals}, () => Math.random() * (Math.PI / 16) - Math.PI / 32);
        this.stem = new MyStem(this.scene, stemRadius, stemSize, 1, 2.5, -Math.PI / 8, Math.PI / 8, stemColor, leavesColor);

        this.pollenPickupPosition = {x: 0, y: this.stem.height - this.stemAdjustment, z: receptacleRadius};

        this.materialPetals = new CGFappearance(this.scene);
        this.materialPetals.setAmbient(0, 0, 0, 1.0);
        this.materialPetals.setDiffuse(...petalsColor);
        this.materialPetals.setSpecular(0, 0, 0, 1.0);
        this.materialPetals.setShininess(10.0);

        this.texturePetal1 = new CGFtexture(this.scene, 'images/petal1.png');
        this.texturePetal2 = new CGFtexture(this.scene, 'images/petal2.png');
        const texturePetal = Math.random() < 0.5 ? this.texturePetal1 : this.texturePetal2;
        this.materialPetals.setTexture(texturePetal);
        this.materialPetals.setTextureWrap('REPEAT', 'REPEAT');

        this.materialReceptacle = new CGFappearance(this.scene);
        this.materialReceptacle.setAmbient(0, 0, 0, 1.0);
        this.materialReceptacle.setDiffuse(...receptacleColor);
        this.materialReceptacle.setSpecular(0, 0, 0, 1.0);
        this.materialReceptacle.setShininess(10.0);

        this.textureReceptacle1 = new CGFtexture(this.scene, 'images/receptacle1.png');
        this.textureReceptacle2 = new CGFtexture(this.scene, 'images/receptacle2.jpeg');
        const textureReceptacle = Math.random() < 0.5 ? this.textureReceptacle1 : this.textureReceptacle2;
        this.materialReceptacle.setTexture(textureReceptacle);
        this.materialReceptacle.setTextureWrap('REPEAT', 'REPEAT');
	}

    updatePollenPickupPosition(dx, dy, dz) {
        this.pollenPickupPosition.x += dx;
        this.pollenPickupPosition.y += dy;
        this.pollenPickupPosition.z += dz;
    }
	
	display() {
        this.scene.pushMatrix();
        this.scene.rotate(this.bodyRotationAng, 0, 1, 0);
        this.scene.translate(0, this.stem.height - this.stemAdjustment, 0);

        this.scene.pushMatrix();
        this.scene.rotate(this.flowerHeadRotationAng, 1, 0, 0);

        this.materialReceptacle.apply();

        this.scene.pushMatrix();
        this.scene.scale(this.receptacleRadius, this.receptacleRadius, this.receptacleRadius);
        this.receptacle.display();
        this.scene.popMatrix();

        if (this.pollenGrain !== null) {
            this.scene.pushMatrix();
            this.scene.translate(0, 0, this.receptacleRadius / 2);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.scene.rotate(this.pollenGrainRotationY, 0, 1, 0);
            this.scene.rotate(this.pollenGrainRotationX, 1, 0, 0);
            this.scene.scale(1.25, 1.25, 1.25);
            this.pollenGrain.display();
            this.scene.popMatrix();
        }

        this.materialPetals.apply();
        
        let angBetweenPetals = (2 * Math.PI) / this.numPetals;
        for (let i = 0; i < this.numPetals; i++) {
            this.petal.curvature = this.curvatures[i];

            this.scene.pushMatrix();
            this.scene.rotate(i * angBetweenPetals, 0, 0, 1);
            this.scene.rotate(this.unionAngs[i], 1, 0, 0);
            this.scene.translate(0, this.flowerRadius / 2, 0);
            this.scene.scale(this.flowerRadius, this.flowerRadius, 1);
            this.petal.display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, this.stemAdjustment, 0);
        this.stem.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}
