import {CGFappearance, CGFobject, CGFtexture} from '../../../lib/CGF.js';
import { MyCylinder } from '../solids/MyCylinder.js';
import { MyLeaf } from './MyLeaf.js';

export class MyStem extends CGFobject {
	constructor(scene, radius, numCylinders, minCylinderLen, maxCylinderLen, minJunctionAng, maxJunctionAng, stemColor, leavesColor) {
		super(scene);

        this.radius = radius;
        this.numCylinders = numCylinders;
        this.minCylinderLen = minCylinderLen;
        this.maxCylinderLen = maxCylinderLen;
        this.minJunctionAng = minJunctionAng;
        this.maxJunctionAng = maxJunctionAng;

        this.cylinder = new MyCylinder(this.scene, 10, 1);
        this.cylinderLens = Array.from({length: this.numCylinders}, () => Math.random() * (this.maxCylinderLen - this.minCylinderLen) + this.minCylinderLen);
        this.cylinderJunctionAngs = Array.from({length: this.numCylinders}, () => Math.random() * (this.maxJunctionAng - this.minJunctionAng) + this.minJunctionAng);
        this.junctionLeaf = new MyLeaf(this.scene);

        this.materialStem = new CGFappearance(this.scene);
        this.materialStem.setAmbient(0, 0, 0, 1.0);
        this.materialStem.setDiffuse(...stemColor);
        this.materialStem.setSpecular(0, 0, 0, 1.0);
        this.materialStem.setShininess(10.0);

        this.textureStem1 = new CGFtexture(this.scene, 'images/stem1.png');
        this.textureStem2 = new CGFtexture(this.scene, 'images/stem2.jpeg');
        const textureStem = Math.random() < 0.5 ? this.textureStem1 : this.textureStem2;
        this.materialStem.setTexture(textureStem);
        this.materialStem.setTextureWrap('REPEAT', 'REPEAT');

        this.materialLeaves = new CGFappearance(this.scene);
        this.materialLeaves.setAmbient(0, 0, 0, 1.0);
        this.materialLeaves.setDiffuse(...leavesColor);
        this.materialLeaves.setSpecular(0, 0, 0, 1.0);
        this.materialLeaves.setShininess(10.0);

        this.textureLeaf1 = new CGFtexture(this.scene, 'images/leaf1.jpeg');
        this.textureLeaf2 = new CGFtexture(this.scene, 'images/leaf2.jpeg');
        const textureLeaf = Math.random() < 0.5 ? this.textureLeaf1 : this.textureLeaf2;
        this.materialLeaves.setTexture(textureLeaf);
        this.materialLeaves.setTextureWrap('REPEAT', 'REPEAT');

        this.height = 0;

        for (let i = 0; i < this.numCylinders; i++) {
            const cylinderLen = this.cylinderLens[i];
            const junctionAng = this.cylinderJunctionAngs[i];

            this.height += Math.cos(junctionAng) * cylinderLen;
        }
	}
	
	display() {
        let vertOffset = 0;
        let hozOffset = 0;
        for (let i = 0; i < this.numCylinders; i++) {
            const cylinderLen = this.cylinderLens[i];
            const junctionAng = this.cylinderJunctionAngs[i];

            this.materialStem.apply();
            
            this.scene.pushMatrix();
            this.scene.translate(hozOffset, -vertOffset, 0);
            this.scene.rotate(junctionAng, 0, 0, 1);
            this.scene.rotate((Math.PI / 2), 1, 0, 0);
            this.scene.scale(this.radius, this.radius, cylinderLen);
            this.cylinder.display();
            this.scene.popMatrix();

            if (i > 0) {
                const prevJunctionAng = this.cylinderJunctionAngs[i - 1];

                let leafHozOffset;
                if (prevJunctionAng > 0) {
                    leafHozOffset = junctionAng <= prevJunctionAng ? 1 : -1;
                } else if (prevJunctionAng <= 0) {
                    leafHozOffset = junctionAng >= prevJunctionAng ? -1 : 1;
                }

                this.materialLeaves.apply();

                this.scene.pushMatrix();
                this.scene.translate(hozOffset, -vertOffset, 0);
                this.scene.rotate(prevJunctionAng, 0, 0, 1);
                this.scene.translate(leafHozOffset, 0, 0);
                this.junctionLeaf.display();
                this.scene.popMatrix();
            }

            vertOffset += Math.cos(junctionAng) * cylinderLen;
            hozOffset += Math.sin(junctionAng) * cylinderLen;
        }
    }
}
