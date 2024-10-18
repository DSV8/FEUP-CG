import { CGFobject } from '../../../lib/CGF.js';

export class MySemiCircle extends CGFobject {
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

        // Add center vertex and normals
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, 1);
        this.texCoords.push(0.5, 0.5);

        // Add vertices, normals, and texture coordinates for half circle
        let angleIncrement = Math.PI / this.slices;
        for (let i = 0; i <= this.slices; i++) { // Change this to i <= this.slices
            let x = this.radius * Math.cos(i * angleIncrement);
            let y = this.radius * Math.sin(i * angleIncrement);

            this.vertices.push(x, y, 0);
            this.normals.push(0, 0, 1);
            this.texCoords.push(0.5 + 0.5 * Math.cos(i * angleIncrement), 0.5 + 0.5 * Math.sin(i * angleIncrement));
        }

        // Add indices for half circle
        for (let i = 0; i < this.slices; i++) { // Change this to i < this.slices
            this.indices.push(0, i + 1, i + 2);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}