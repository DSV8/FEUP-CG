import { CGFobject } from '../../../lib/CGF.js';
import { MyCylinder } from '../solids/MyCylinder.js';

export class MyBeeAntennae extends CGFobject {
	constructor(scene, material) {
		super(scene);

        this.cylinder = new MyCylinder(scene, 20, 10);
        this.material = material;
	}
	
	display() {
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.0175, 0.0175, 0.25);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.275, -0.01125);
        this.scene.rotate(Math.PI/5, 1, 0, 0);
        this.scene.scale(0.025, 0.025, 0.5);
        this.cylinder.display();
        this.scene.popMatrix();
    }
}
