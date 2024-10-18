import {CGFobject} from '../../../lib/CGF.js';
import { MyCylinder } from '../solids/MyCylinder.js';
import { MyTriangleSmall } from '../shapes/MyTriangleSmall.js';

export class MyLeaf extends CGFobject {
	constructor(scene) {
		super(scene);

        this.cylinder = new MyCylinder(this.scene, 10, 1);
        this.triangleTop = new MyTriangleSmall(this.scene);
        this.triangleBottom = new MyTriangleSmall(this.scene);
	}
	
	display() {
        this.scene.pushMatrix();
		this.scene.scale(1, 0.5, 1);
        this.triangleTop.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
        this.scene.scale(1, 0.5, 1);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.triangleBottom.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.translate(0, 0, -1);
        this.scene.scale(0.05, 0.05, 2);
        this.cylinder.display();
        this.scene.popMatrix();
    }
}
