import { CGFobject } from '../../../lib/CGF.js';

export class MyCircle extends CGFobject {
    constructor(scene, radius, slices) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        this.vertices.push(0, 0, 0);
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, 1);
        this.normals.push(0, 0, -1);
        this.texCoords.push(0.5, 0.5);
        this.texCoords.push(0.5, 0.5);

        let angleIncrement = (2 * Math.PI) / this.slices;

        for (let i = 0; i < this.slices; i++) {
            let x = this.radius * Math.cos(i * angleIncrement);
            let y = this.radius * Math.sin(i * angleIncrement);

            this.vertices.push(x, y, 0);
            this.vertices.push(x, y, 0);

            this.normals.push(0, 0, 1);
            this.normals.push(0, 0, -1);

            this.texCoords.push(0.5 + 0.5 * Math.cos(i * angleIncrement), 0.5 + 0.5 * Math.sin(i * angleIncrement));
            this.texCoords.push(0.5 + 0.5 * Math.cos(i * angleIncrement), 0.5 + 0.5 * Math.sin(i * angleIncrement));

            this.indices.push(0, 2 * i + 2, 2 * ((i + 1) % this.slices) + 2);
            this.indices.push(1, 2 * ((i + 1) % this.slices) + 3, 2 * i + 3);
        }
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}