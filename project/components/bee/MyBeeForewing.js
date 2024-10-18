import { CGFobject } from "../../../lib/CGF.js";
import { MyCircle } from "../shapes/MyCircle.js";

export class MyBeeForewing extends CGFobject {
    constructor(scene, material) {
        super(scene);

        this.circle = new MyCircle(scene, 1, 50);
        this.material = material;
    }

    display() {
        this.material.apply();
        
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.5, 1.3, 1);
        this.circle.display();
        this.scene.popMatrix();
    }
}