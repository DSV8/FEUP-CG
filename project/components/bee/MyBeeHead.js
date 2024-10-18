import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyEllipsoid } from '../solids/MyEllipsoid1.js';

export class MyBeeHead extends CGFobject {
	constructor(scene) {
		super(scene);

        this.sphere = new MyEllipsoid(scene, 20, 10, false);

        this.texture = new CGFtexture(this.scene, 'images/yellowfur.png');

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
		this.scene.scale(0.45, 0.4, 0.35);
        this.sphere.display();
        this.scene.popMatrix();
    }
}
