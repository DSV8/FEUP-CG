import {CGFobject} from '../../../lib/CGF.js';

export class MyQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            -0.5, -0.5, 0,	//0
            0.5, -0.5, 0,	//1
            0.5, 0.5, 0,	//2
			-0.5, 0.5, 0,   //3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			0, 2, 3,
			2, 1, 0,
			3, 2, 0,
		];

		this.texCoords = [
			0, 1, //0
			1, 1, //1
			1, 0, //2
			0, 0, //3
		];

		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
