import { CGFobject } from '../../../lib/CGF.js';
import { MyCone } from '../solids/MyCone.js';

export class MyBeeStinger extends CGFobject {
	constructor(scene, material) {
		super(scene);

        this.cone = new MyCone(scene, 20, 10);
        this.material = material;
	}
	
	display() {
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.scale(0.075, 0.3, 0.075);
        this.cone.display();
        this.scene.popMatrix();
    }
}
