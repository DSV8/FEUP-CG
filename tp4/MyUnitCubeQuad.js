import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(
        scene,
        side1Url = 'images/default.png',
        side2Url = 'images/default.png',
        side3Url = 'images/default.png',
        side4Url = 'images/default.png',
        topUrl = 'images/default.png',
        bottomUrl = 'images/default.png'
        )
    {
		super(scene);

        this.quad = new MyQuad(this.scene);
        this.side1Tex = new CGFtexture(this.scene, side1Url);
        this.side2Tex = new CGFtexture(this.scene, side2Url);
        this.side3Tex = new CGFtexture(this.scene, side3Url);
        this.side4Tex = new CGFtexture(this.scene, side4Url);
        this.topTex = new CGFtexture(this.scene, topUrl);
        this.bottomTex = new CGFtexture(this.scene, bottomUrl);
        
        this.faceMaterial = new CGFappearance(this.scene); 
	}
	
	display() {
        // face paralela a xoy, z positivo
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, 0.5);
        this.faceMaterial.setTexture(this.side1Tex);
        this.faceMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        // face paralela a xoy, z negativo
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, -0.5);
        this.scene.rotate(Math.PI, 0.0, 1.0, 0.0);
        this.faceMaterial.setTexture(this.side2Tex);
        this.faceMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //this.faceMaterial.setTexture(this.side3Tex);
        //this.faceMaterial.apply();

        // face paralela a yoz, x positivo
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.0, 0.0);
        this.scene.rotate((Math.PI / 2.0), 0.0, 1.0, 0.0);
        this.faceMaterial.setTexture(this.side3Tex);
        this.faceMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        // face paralela a yoz, x negativo
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.0, 0.0);
        this.scene.rotate(-(Math.PI / 2.0), 0.0, 1.0, 0.0);
        this.faceMaterial.setTexture(this.side4Tex);
        this.faceMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        // face paralela a zox, y positivo
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.5, 0.0);
        this.scene.rotate(-(Math.PI / 2.0), 1.0, 0.0, 0.0);
        this.faceMaterial.setTexture(this.topTex);
        this.faceMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        // face paralela a zox, y negativo
        this.scene.pushMatrix();
        this.scene.translate(0.0, -0.5, 0.0);
        this.scene.rotate((Math.PI / 2.0), 1.0, 0.0, 0.0);
        this.faceMaterial.setTexture(this.bottomTex);
        this.faceMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
    }
}
