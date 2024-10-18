import {CGFobject} from '../lib/CGF.js';

export class MyRock extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = 2 * stacks;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        for (let stack = 0; stack <= this.stacks; ++stack) {
            let theta = stack * Math.PI / this.stacks;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);

            let firstSliceDisplacement = null;

            for (let slice = 0; slice <= this.slices; ++slice) {
                let phi = slice * 2 * Math.PI / this.slices;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);

                let x = cosPhi * sinTheta;
                let y = cosTheta;
                let z = sinPhi * sinTheta;

                let displacement = Math.random() * 0.2 - 0.1;
                
                if (slice == 0) firstSliceDisplacement = displacement;
                else if (slice == this.slices) displacement = firstSliceDisplacement;

                x += displacement * x;
                y += displacement * y;
                z += displacement * z;

                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);
                
                this.texCoords.push(1 - (slice / this.slices), stack / this.stacks);
            }
        }

        for (let stack = 0; stack < this.stacks; ++stack) {
            for (let slice = 0; slice < this.slices; ++slice) {
                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;

                this.indices.push(first + 1, second, first);
                this.indices.push(first + 1, second + 1, second);
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
