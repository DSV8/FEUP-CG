import { CGFobject } from '../../../lib/CGF.js';
import { MySphere } from '../solids/MySphere.js';

export class MyBeeMiddleLeg extends CGFobject {
	constructor(scene, material) {
		super(scene);

        this.sphere = new MySphere(scene, 20, 10, false);
        this.material = material;
	}
	
	display() {
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.translate(1.07, -0.6, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.scene.scale(0.3, 0.075, 0.075)
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.925, -0.075, 0);
        this.scene.rotate(-Math.PI/3, 0, 0, 1);
		this.scene.scale(0.3, 0.065, 0.065);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.43, 0, 0);
        this.scene.rotate(Math.PI/7, 0, 0, 1);
		this.scene.scale(0.425, 0.1, 0.1);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/3, 0, 0, 1);
		this.scene.scale(0.175, 0.085, 0.085);
        this.sphere.display();
        this.scene.popMatrix();
    }
}
