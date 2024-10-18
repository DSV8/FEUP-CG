import {CGFappearance} from '../lib/CGF.js';
import { MyRock } from "./MyRock.js";

export class MyRockSet {
    constructor(scene, numRocks, startRing) {
        this.scene = scene;
        this.rock = new MyRock(this.scene, 10, 5);
        this.scalings = Array.from({length: numRocks}, () => ({x: Math.random() * 0.5 + 0.5, y: Math.random() * 0.75 + 0.25}));
        this.orientations = Array.from({length: numRocks}, () => ({x: Math.random() * Math.PI / 2 - Math.PI / 4, z: Math.random() * Math.PI / 2 - Math.PI / 4}));

        this.numRocks = numRocks;
        this.startRing = startRing;
        
        this.rocksUsed;
        this.rocksAvailable;
        this.ringNumber;

        this.materialDarkGrey = new CGFappearance(this.scene);
        this.materialDarkGrey.setAmbient(0, 0, 0, 1);
        this.materialDarkGrey.setDiffuse(0.25, 0.25, 0.4, 1);
        this.materialDarkGrey.setSpecular(0.25, 0.25, 0.4, 1);
        this.materialDarkGrey.setShininess(10.0);
    }

    drawRing(numRocksRing, ringNumber) {
        if (numRocksRing === 1) {
            this.scene.pushMatrix();
            this.scene.rotate(this.orientations[0].z, 0, 0, 1);
            this.scene.rotate(this.orientations[0].x, 1, 0, 0);
            this.scene.scale(this.scalings[0].x, this.scalings[0].y, 1);
            this.rock.display();
            this.scene.popMatrix();
            return;
        }

        const ringAng = 2 * Math.PI / numRocksRing;

        for (let i = 0; i < numRocksRing; i++) {
            const ang = ringAng * i;

            this.scene.pushMatrix();
            this.scene.rotate(ang, 0, 1, 0);
            this.scene.translate(0, 0, -(1.1 * (ringNumber - 1)));
            this.scene.rotate(this.orientations[i + this.rocksUsed].z, 0, 0, 1);
            this.scene.rotate(this.orientations[i + this.rocksUsed].x, 1, 0, 0);
            this.scene.scale(this.scalings[i + this.rocksUsed].x, this.scalings[i + this.rocksUsed].y, 1);
            this.rock.display();
            this.scene.popMatrix();
        }
    }

    drawPile() {
        this.rocksUsed = 0;
        this.rocksAvailable = this.numRocks;

        this.ringNumber = this.startRing;
        while (this.rocksAvailable > 0) {
            let numRocksRing = this.ringNumber === 1 ? 1 : Math.min(Math.trunc((2 * Math.PI * 1.1 * (this.ringNumber - 1)) / 1.1), this.rocksAvailable);

            this.scene.pushMatrix();
            this.scene.translate(0, -(0.55 * (this.ringNumber - 1)), 0);
            this.drawRing(numRocksRing, this.ringNumber);
            this.scene.popMatrix();

            this.rocksUsed += numRocksRing;
            this.rocksAvailable -= numRocksRing;
            this.ringNumber++;
        }
    }

    display() {
        this.materialDarkGrey.apply();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 0.55 * (this.ringNumber - 1), 0);
        this.drawPile();
        this.scene.popMatrix();
    }
}