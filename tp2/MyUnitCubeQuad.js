import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);

        this.quad = new MyQuad(this.scene);        
	}
	
	display() {
        // face paralela a xoy, z positivo
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        // face paralela a xoy, z negativo
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, -0.5);
        this.quad.display();
        this.scene.popMatrix();

        // face paralela a yoz, x positivo
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.0, 0.0);
        this.scene.rotate((Math.PI / 2.0), 0.0, 1.0, 0.0);
        this.quad.display();
        this.scene.popMatrix();

        // face paralela a yoz, x negativo
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.0, 0.0);
        this.scene.rotate(-(Math.PI / 2.0), 0.0, 1.0, 0.0);
        this.quad.display();
        this.scene.popMatrix();

        // face paralela a zox, y positivo
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.5, 0.0);
        this.scene.rotate((Math.PI / 2.0), 1.0, 0.0, 0.0);
        this.quad.display();
        this.scene.popMatrix();

        // face paralela a zox, y negativo
        this.scene.pushMatrix();
        this.scene.translate(0.0, -0.5, 0.0);
        this.scene.rotate(-(Math.PI / 2.0), 1.0, 0.0, 0.0);
        this.quad.display();
        this.scene.popMatrix();
    }
}
