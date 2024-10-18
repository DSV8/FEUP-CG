import {CGFobject} from '../../../lib/CGF.js';
import { MySphere } from '../solids/MySphere.js';

export class MyReceptacle extends CGFobject {
	constructor(scene) {
		super(scene);

        this.sphere = new MySphere(this.scene, 10, 5, false);
	}
	
	display() {
        this.scene.pushMatrix();
        this.scene.scale(1, 1, 0.5);
        this.sphere.display();
        this.scene.popMatrix();
    }
}
