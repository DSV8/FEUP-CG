import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            -0.5, -0.5, -0.5, //-xoy
			-0.5, -0.5, -0.5, //-yoz
			-0.5, -0.5, -0.5, //-zox
            0.5, -0.5, -0.5, //-xoy
			0.5, -0.5, -0.5, //yoz
			0.5, -0.5, -0.5, //-zox
            -0.5, 0.5, -0.5, //-xoy
			-0.5, 0.5, -0.5, //-yoz
			-0.5, 0.5, -0.5, //zox
			0.5, 0.5, -0.5, //-xoy
			0.5, 0.5, -0.5, //yoz
			0.5, 0.5, -0.5, //zox
			-0.5, -0.5, 0.5, //xoy
			-0.5, -0.5, 0.5, //-yoz
			-0.5, -0.5, 0.5, //-zox
            0.5, -0.5, 0.5, //xoy
			0.5, -0.5, 0.5, //yoz
			0.5, -0.5, 0.5, //-zox
            -0.5, 0.5, 0.5, //xoy
			-0.5, 0.5, 0.5, //-yoz
			-0.5, 0.5, 0.5, //zox
			0.5, 0.5, 0.5, //xoy
			0.5, 0.5, 0.5, //yoz
			0.5, 0.5, 0.5, //zox
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			6, 3, 0,            //face plano xOy, z = -0.5
			6, 9, 3,
            12, 15, 21,            //face plano xOy, z = 0.5
            21, 18, 12,
            18, 6, 0,            //face plano yOz, x = -0.5
            0, 12, 18,
            21, 15, 3,            //face plano yOz, x = 0.5
            3, 9, 21,
            0, 3, 15,            //face plano xOz, y = -0.5
            15, 12, 0,
            18, 21, 9,            //face plano xOz, y = 0.5
            9, 6, 18,
		];

		this.normals = [
			0, 0, -1,
			0, -1, 0,
			-1, 0, 0,
			0, 0, -1,
			0, -1, 0,
			1, 0, 0,
			0, 0, -1,
			0, 1, 0,
			-1, 0, 0,
			0, 0, -1,
			0, 1, 0,
			1, 0, 0,
			0, 0, 1,
			0, -1, 0,
			-1, 0, 0,
			0, 0, 1,
			0, -1, 0,
			1, 0, 0,
			0, 0, 1,
			0, 1, 0,
			-1, 0, 0,
			0, 0, 1,
			0, 1, 0,
			1, 0, 0,
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
