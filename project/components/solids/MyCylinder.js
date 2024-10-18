import {CGFobject} from '../../../lib/CGF.js';
/**
* MyCylinder
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const alphaAng = 2 * Math.PI / this.slices;
        const stack_len = 1 / this.stacks;

        for(let i = 0; i <= this.stacks; i++) {
            for(let j = 0; j < this.slices; j++) {
                const ang = alphaAng * j;
                const sa = Math.sin(ang);
                const ca = Math.cos(ang);
            
                this.vertices.push(ca, sa, i * stack_len);
                this.normals.push(ca, sa, 0);

                // UV Coordinates
                const u = j / this.slices;
                const v = i / this.stacks;
                this.texCoords.push(u, v);
        
                if (i < this.stacks) {
                    const current = this.slices * i + j;
                    const next = this.slices * i + (j + 1) % this.slices;
                    const upperCurrent = this.slices * (i + 1) + j;
                    const upperNext = this.slices * (i + 1) + (j + 1) % this.slices;

                    this.indices.push(current, next, upperNext);
                    this.indices.push(current, upperNext, upperCurrent);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
