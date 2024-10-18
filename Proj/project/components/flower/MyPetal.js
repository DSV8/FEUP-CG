import {CGFobject} from '../../../lib/CGF.js';
import { MyTriangleSmall } from '../shapes/MyTriangleSmall.js';

export class MyPetal extends CGFobject {
	constructor(scene) {
		super(scene);

        this.triangleTop = new MyTriangleSmall(this.scene);
        this.triangleBottom = new MyTriangleSmall(this.scene);
        this.curvature = null;
	}
	
	display() {
        this.scene.pushMatrix();
		this.scene.scale(0.25, 0.5, 1.0);
        if (this.curvature !== null)
            this.scene.rotate(this.curvature, 1, 0, 0);
        this.triangleTop.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
        this.scene.scale(0.25, 0.5, 1.0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.triangleBottom.display();
        this.scene.popMatrix();
    }
}
