import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MySphere } from '../solids/MySphere.js';

export class MyBeeEye extends CGFobject {
	constructor(scene) {
		super(scene);

        this.sphere = new MySphere(scene, 20, 10, false, 10);

        this.texture = new CGFtexture(this.scene, 'images/bugeye.png');

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.material.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.material.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.material.setEmission(0.0, 0.0, 0.0, 0.0);
        this.material.setShininess(1.0);
        this.material.setTexture(this.texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
	}
	
	display() {
        this.material.apply();
        
        this.scene.pushMatrix();
		this.scene.scale(0.2, 0.3, 0.2);
        this.sphere.display();
        this.scene.popMatrix();
    }
}
