import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangle } from './MyTriangle.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		
        this.diamond = new MyDiamond(this.scene);
        this.bigTriangleBlue = new MyTriangleBig(this.scene);
        this.bigTriangleOrange = new MyTriangleBig(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.smallTriangleRed = new MyTriangleSmall(this.scene);
        this.smallTrianglePurple = new MyTriangleSmall(this.scene);
	}
	
	display() {
        var rot = [
            Math.cos(45 * Math.PI / 180),
            Math.sin(45 * Math.PI / 180),
            0.0,
            0.0,
            -Math.sin(45 * Math.PI / 180),
            Math.cos(45 * Math.PI / 180),
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
        ];
      
        var trans = [
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            1.5 * Math.sqrt(2.0),
            0.5 * Math.sqrt(2.0),
            0.0,
            1.0,
        ];

        this.scene.pushMatrix();
        this.scene.multMatrix(trans);
        this.scene.multMatrix(rot);
        this.diamond.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2.0), -Math.sqrt(2.0), 0.0);
        this.scene.rotate(Math.PI / 4.0, 0.0, 0.0, 1.0);
        this.bigTriangleBlue.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2.0), -0.2 * Math.sqrt(2.0), 0.0);
        this.scene.rotate(-(Math.PI / 4.0), 0.0, 0.0, 1.0);
        this.bigTriangleOrange.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(-2.0 * Math.sqrt(2.0), 0.8 * Math.sqrt(2.0), 0.0);
        this.scene.rotate(-(Math.PI / 4.0), 0.0, 0.0, 1.0);
        this.scene.scale(1.0, -1.0, 1.0);
        this.parallelogram.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2.0), 0.8 * Math.sqrt(2.0), 0.0);
        this.scene.rotate((-135 * Math.PI) / 180, 0.0, 0.0, 1.0);
        this.triangle.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(1.7 * Math.sqrt(2.0), Math.sqrt(2.0), 0.0);
        this.smallTriangleRed.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(1.4 * Math.sqrt(2.0), -1.3 * Math.sqrt(2.0), 0.0);
        this.scene.rotate(Math.PI / 2.0, 0.0, 0.0, 1.0);
        this.smallTrianglePurple.display();
        this.scene.popMatrix();
    }
}
