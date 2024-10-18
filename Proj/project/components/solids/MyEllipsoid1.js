import { CGFtexture, CGFappearance } from '../../../lib/CGF.js';
import { MySphere } from "./MySphere.js";

export class MyEllipsoid extends MySphere {
    constructor(scene, slices, stacks, inverted = false) {
        super(scene, slices, stacks, inverted);
    }

    initBuffers() {
        super.initBuffers();

        for (let i = 0; i < this.vertices.length; i += 3) {
            if (this.vertices[i+1] < 0) {
                this.vertices[i+1] *= 1.5;
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        super.display();
    }
}