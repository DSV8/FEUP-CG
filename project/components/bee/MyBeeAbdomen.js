import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MySphere } from '../solids/MySphere.js';

export class MyBeeAbdomen extends CGFobject {
	constructor(scene) {
		super(scene);

        this.sphere = new MySphere(scene, 20, 10, false);

        this.texture = new CGFtexture(this.scene, 'images/beefur.png');

        this.material = new CGFappearance(this.scene);
        this.material.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.material.setSpecular(0.0, 0.0, 0.0, 1.0);
        this.material.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.material.setEmission(0.0, 0.0, 0.0, 1.0);
        this.material.setTexture(this.texture);
    }
	
	display() {
        this.material.apply();
        
        this.scene.pushMatrix();
		this.scene.scale(0.6, 0.6, 1.0);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.sphere.display();
        this.scene.popMatrix();
    }
}
