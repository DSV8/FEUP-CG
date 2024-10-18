import {CGFobject} from '../../../lib/CGF.js';

export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, inverted = false, texCoordsMultiplier = 1) {
        super(scene);
        this.slices = slices;
        this.stacks = 2 * stacks;
        this.inverted = inverted;
        this.texCoordsMultiplier = texCoordsMultiplier;

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

            for (let slice = 0; slice <= this.slices; ++slice) {
                let phi = slice * 2 * Math.PI / this.slices;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);

                let x = cosPhi * sinTheta;
                let y = cosTheta;
                let z = sinPhi * sinTheta;

                this.vertices.push(x, y, z);

                if (this.inverted) this.normals.push(-x, -y, -z);
                else this.normals.push(x, y, z);
                
                this.texCoords.push(1 - (slice / this.slices) * this.texCoordsMultiplier, stack / this.stacks * this.texCoordsMultiplier);
            }
        }

        for (let stack = 0; stack < this.stacks; ++stack) {
            for (let slice = 0; slice < this.slices; ++slice) {
                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;

                if (this.inverted) {
                    this.indices.push(first, second, first + 1);
                    this.indices.push(second, second + 1, first + 1);
                } else {
                    this.indices.push(first + 1, second, first);
                    this.indices.push(first + 1, second + 1, second);
                }
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }    
}
