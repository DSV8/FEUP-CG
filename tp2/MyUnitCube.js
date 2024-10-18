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
            -0.5, -0.5, -0.5,	//0
            0.5, -0.5, -0.5,	//1
            -0.5, 0.5, -0.5,	//2
			0.5, 0.5, -0.5,	    //3
			-0.5, -0.5, 0.5,	//4
            0.5, -0.5, 0.5,		//5
            -0.5, 0.5, 0.5,	    //6
			0.5, 0.5, 0.5		//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2, 1, 0,            //face plano xOy, z = -0.5
			2, 3, 1,
            4, 5, 7,            //face plano xOy, z = 0.5
            7, 6, 4,
            6, 2, 0,            //face plano yOz, x = -0.5
            0, 4, 6,
            7, 5, 1,            //face plano yOz, x = 0.5
            1, 3, 7,
            0, 1, 5,            //face plano xOz, y = -0.5
            5, 4, 0,
            6, 7, 3,            //face plano xOz, y = 0.5
            3, 2, 6
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
