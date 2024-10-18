import { CGFobject} from '../../../lib/CGF.js';
import { MySphere } from '../solids/MySphere.js';

export class MyBeeHindLeg extends CGFobject {
	constructor(scene, material) {
		super(scene);

        this.sphere = new MySphere(scene, 20, 10, false);
        this.material = material;
	}
	
	display() {
        this.material.apply();
        
        this.scene.pushMatrix();
        this.scene.translate(1.025, -0.8, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.scene.scale(0.2, 0.09, 0.09);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.85, -0.3, 0);
        this.scene.rotate(-Math.PI/3, 0, 0, 1);
		this.scene.scale(0.4, 0.095, 0.095);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.375, -0.075, 0);
        this.scene.rotate(Math.PI/10, 0, 0, 1);
		this.scene.scale(0.35, 0.1, 0.1);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/3, 0, 0, 1);
		this.scene.scale(0.2, 0.085, 0.085);
        this.sphere.display();
        this.scene.popMatrix();
    }
}
