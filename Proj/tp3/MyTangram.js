import {CGFappearance, CGFobject} from '../lib/CGF.js';
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
		
        this.initMaterials();

        this.diamond = new MyDiamond(this.scene);
        this.bigTriangleBlue = new MyTriangleBig(this.scene);
        this.bigTriangleOrange = new MyTriangleBig(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.smallTriangleRed = new MyTriangleSmall(this.scene);
        this.smallTrianglePurple = new MyTriangleSmall(this.scene);
	}

    initMaterials() {
        // Green High Specular
        this.materialGreen = new CGFappearance(this.scene);
        this.materialGreen.setAmbient(0, 0, 0, 1.0);
        this.materialGreen.setDiffuse(0, 1*0.75, 0, 1.0);
        this.materialGreen.setSpecular(0, 1, 0, 1.0);
        this.materialGreen.setShininess(10.0);

        // Blue High Specular
        this.materialBlue = new CGFappearance(this.scene);
        this.materialBlue.setAmbient(0, 0, 0, 1.0);
        this.materialBlue.setDiffuse(0, 0, 1*0.75, 1.0);
        this.materialBlue.setSpecular(0, 0, 1, 1.0);
        this.materialBlue.setShininess(10.0);

        // Orange High Specular
        this.materialOrange = new CGFappearance(this.scene);
        this.materialOrange.setAmbient(0, 0, 0, 1.0);
        this.materialOrange.setDiffuse(1*0.75, 0.647*0.75, 0, 1.0);
        this.materialOrange.setSpecular(1, 0.647, 0, 1.0);
        this.materialOrange.setShininess(10.0);

        // Yellow High Specular
        this.materialYellow = new CGFappearance(this.scene);
        this.materialYellow.setAmbient(0, 0, 0, 1.0);
        this.materialYellow.setDiffuse(1*0.75, 1*0.75, 0, 1.0);
        this.materialYellow.setSpecular(1, 1, 0, 1.0);
        this.materialYellow.setShininess(10.0);

        // Pink High Specular
        this.materialPink = new CGFappearance(this.scene);
        this.materialPink.setAmbient(0, 0, 0, 1.0);
        this.materialPink.setDiffuse(1, 0.753*0.75, 0.796*0.75, 1.0);
        this.materialPink.setSpecular(1, 0.753, 0.796, 1.0);
        this.materialPink.setShininess(10.0);

        // Red High Specular
        this.materialRed = new CGFappearance(this.scene);
        this.materialRed.setAmbient(0, 0, 0, 1.0);
        this.materialRed.setDiffuse(1*0.75, 0, 0, 1.0);
        this.materialRed.setSpecular(1, 0, 0, 1.0);
        this.materialRed.setShininess(10.0);

        // Purple High Specular
        this.materialPurple = new CGFappearance(this.scene);
        this.materialPurple.setAmbient(0, 0, 0, 1.0);
        this.materialPurple.setDiffuse(0.5*0.75, 0.25*0.75, 0.5*0.75, 1.0);
        this.materialPurple.setSpecular(0.5, 0.25, 0.5, 1.0);
        this.materialPurple.setShininess(10.0);
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

        //this.materialGreen.apply();
        this.scene.customMaterial.apply();

        this.scene.pushMatrix();
        this.scene.multMatrix(trans);
        this.scene.multMatrix(rot);
        this.diamond.display();
        this.scene.popMatrix();
    
        this.materialBlue.apply();

        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2.0), -Math.sqrt(2.0), 0.0);
        this.scene.rotate(Math.PI / 4.0, 0.0, 0.0, 1.0);
        this.bigTriangleBlue.display();
        this.scene.popMatrix();
    
        this.materialOrange.apply();

        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2.0), -0.2 * Math.sqrt(2.0), 0.0);
        this.scene.rotate(-(Math.PI / 4.0), 0.0, 0.0, 1.0);
        this.bigTriangleOrange.display();
        this.scene.popMatrix();
    
        this.materialYellow.apply();

        this.scene.pushMatrix();
        this.scene.translate(-2.0 * Math.sqrt(2.0), 0.8 * Math.sqrt(2.0), 0.0);
        this.scene.rotate(-(Math.PI / 4.0), 0.0, 0.0, 1.0);
        this.scene.scale(1.0, -1.0, 1.0);
        this.parallelogram.display();
        this.scene.popMatrix();

        this.materialPink.apply();
    
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2.0), 0.8 * Math.sqrt(2.0), 0.0);
        this.scene.rotate((-135 * Math.PI) / 180, 0.0, 0.0, 1.0);
        this.triangle.display();
        this.scene.popMatrix();

        this.materialRed.apply();
    
        this.scene.pushMatrix();
        this.scene.translate(1.7 * Math.sqrt(2.0), Math.sqrt(2.0), 0.0);
        this.smallTriangleRed.display();
        this.scene.popMatrix();

        this.materialPurple.apply();
    
        this.scene.pushMatrix();
        this.scene.translate(1.4 * Math.sqrt(2.0), -1.3 * Math.sqrt(2.0), 0.0);
        this.scene.rotate(Math.PI / 2.0, 0.0, 0.0, 1.0);
        this.smallTrianglePurple.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.bigTriangleBlue.enableNormalViz();
        this.bigTriangleOrange.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangle.enableNormalViz();
        this.smallTriangleRed.enableNormalViz();
        this.smallTrianglePurple.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.bigTriangleBlue.disableNormalViz();
        this.bigTriangleOrange.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangle.disableNormalViz();
        this.smallTriangleRed.disableNormalViz();
        this.smallTrianglePurple.disableNormalViz();
    }
}
