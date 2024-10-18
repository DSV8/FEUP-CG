import {CGFobject} from '../lib/CGF.js';
/**
* MyPyramid
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

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        var stack_len = 1/this.stacks;

        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, -1);
        for(var i = 0; i < this.slices; i++) {
            var sa = Math.sin(ang);
            var ca = Math.cos(ang);

            this.vertices.push(ca, sa, 0);

            this.normals.push(0, 0, -1);

            if (i < (this.slices - 1)) {
                this.indices.push((i + 2), (i + 1), 0);
            }

            ang += alphaAng;
        }
        this.indices.push(1, this.slices, 0);

        var offset = this.slices + 1;

        for(var i = 0; i < (this.stacks + 1); i++) {
            for(var j = 0; j < this.slices; j++) {
                var sa = Math.sin(ang);
                var ca = Math.cos(ang);
            
                this.vertices.push(ca, sa, (i*stack_len));
                
                // triangle normal equal to position vector
                // already normalized
                this.normals.push(ca, sa, 0);
        
                if (i < this.stacks) {
                    if (j == (this.slices - 1)) {
                        this.indices.push(
                            offset + (this.slices*i + j),
                            offset + (this.slices*i),
                            offset + (this.slices*i + j + 1)
                        );
                        this.indices.push(
                            offset + (this.slices*i + j),
                            offset + (this.slices*i + j + 1),
                            offset + (this.slices*(i + 1) + j)
                        );
                    } else {
                        this.indices.push(
                            offset + (this.slices*i + j),
                            offset + (this.slices*i + j + 1),
                            offset + (this.slices*(i + 1) + j + 1)
                        );
                        this.indices.push(
                            offset + (this.slices*i + j),
                            offset + (this.slices*(i + 1) + j + 1),
                            offset + (this.slices*(i + 1) + j)
                        );
                    }
                }
                ang += alphaAng;
            }
            ang = 0;
        }

        offset += (this.slices*(this.stacks + 1));

        this.vertices.push(0, 0, 1);
        this.normals.push(0, 0, 1);
        for(var i = 0; i < this.slices; i++) {
            var sa = Math.sin(ang);
            var ca = Math.cos(ang);

            this.vertices.push(ca, sa, 1);

            this.normals.push(0, 0, 1);

            if (i < (this.slices - 1)) {
                this.indices.push(offset, offset + (i + 1), offset + (i + 2));
            }

            ang += alphaAng;
        }
        this.indices.push(offset, offset + this.slices, offset + 1);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
