import {CGFobject} from '../../../lib/CGF.js';

export class MyPrism extends CGFobject {
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

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        var stack_len = 1/this.stacks;

        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, -1);
        this.texCoords.push(0.5, 0.5);

        for(var i = 0; i < this.slices; i++) {
            var sa = Math.sin(ang);
            var ca = Math.cos(ang);

            this.vertices.push(ca, sa, 0);
            this.normals.push(0, 0, -1);
            this.texCoords.push((ca + 1) / 2, (sa + 1) / 2);

            var u = (ca + 1) / 2;
            var v = (sa + 1) / 2;
            this.texCoords.push(u, v);

            if (i < (this.slices - 1)) {
                this.indices.push((i + 2), (i + 1), 0);
            }

            ang += alphaAng;
        }
        this.indices.push(1, this.slices, 0);


        var offset = this.slices + 1;
        for(var i = 0; i < this.slices; i++) {

            var sa = Math.sin(ang);
            var saa = Math.sin(ang + alphaAng);
            var ca = Math.cos(ang);
            var caa = Math.cos(ang + alphaAng);

            var normal = [
                (saa - sa),
                (ca - caa),
                0,
            ];

            var nsize = Math.sqrt(
                normal[0]*normal[0] +
                normal[1]*normal[1] +
                normal[2]*normal[2]
                );
            normal[0] /= nsize;
            normal[1] /= nsize;
            normal[2] /= nsize;

            for(var j = 0; j < this.stacks; j++) {
                this.vertices.push(caa, saa, (j*stack_len) + stack_len);
                this.vertices.push(ca, sa, j*stack_len);
                this.vertices.push(caa, saa, j*stack_len);
                this.vertices.push(ca, sa, (j*stack_len) + stack_len);

                this.texCoords.push(i/this.slices, j/this.stacks);
                this.texCoords.push((i + 1)/this.slices, j/this.stacks);
                this.texCoords.push(i/this.slices, (j + 1)/this.stacks);
                this.texCoords.push((i + 1)/this.slices, (j + 1)/this.stacks);

                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);

                this.indices.push(
                    offset + (4*j),
                    offset + (4*j + 1),
                    offset + (4*j + 2)
                );
                this.indices.push(
                    offset + (4*j),
                    offset + (4*j + 3),
                    offset + (4*j + 1)
                );
            }
            offset += 4*this.stacks;
            ang += alphaAng;
        }

        this.vertices.push(0, 0, 1);
        this.normals.push(0, 0, 1);
        for(var i = 0; i < this.slices; i++) {
            var sa = Math.sin(ang);
            var ca = Math.cos(ang);

            this.vertices.push(ca, sa, 1);
            this.normals.push(0, 0, 1);
            this.texCoords.push((ca + 1) / 2, (sa + 1) / 2);

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
