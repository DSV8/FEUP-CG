import { CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MySphere } from "./components/solids/MySphere.js";

export class MyPollen extends MySphere {
    constructor(scene, slices, stacks) {
        super(scene, slices, stacks);

        this.texture = new CGFtexture(this.scene, "images/orange-rough-texture.jpg");
        this.material = new CGFappearance(this.scene);
        this.material.setDiffuse(1, 1, 1, 1);
        this.material.setSpecular(0, 0, 0, 1);
        this.material.setTexture(this.texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    initBuffers() {
        super.initBuffers();

        for (let i = 0; i < this.vertices.length; i += 3) {
            if (this.vertices[i+1] > 0) {
                this.vertices[i+1] *= 1.5;
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updatePosition(dx, dy, dz) {
        this.position.x += dx;
        this.position.y += dy;
        this.position.z += dz;
    }

    display() {
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.scale(0.2, 0.2, 0.2);
        super.display();
        this.scene.popMatrix();
    }
}
