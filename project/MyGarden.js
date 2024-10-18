import {CGFobject} from '../lib/CGF.js';
import { MyFlower } from "./MyFlower.js";

function generateRandomFlower(scene) {
    const flowerRadius = Math.random() * 2 + 1.5;
    const numPetals = Math.trunc(Math.random() * 85 + 15);
    const petalsColor = [Math.random(), Math.random(), Math.random()];
    const receptacleRadius = Math.random() * ((flowerRadius / 2) - (flowerRadius / 4)) + (flowerRadius / 4);
    const receptacleColor = [Math.random() * (1 - 0.85) + 0.85, Math.random() * (1 - 0.5) + 0.5, 0];
    const stemRadius = Math.random() * ((receptacleRadius / 7) - (receptacleRadius / 20)) + (receptacleRadius / 20);
    const stemSize = Math.trunc(Math.random() * 5 + 5);
    const stemColor = [0, Math.random() * (1 - 0.5) + 0.5, Math.random() * 0.5];
    const leavesColor = [0, Math.random() * (0.5 - 0.3) + 0.3, Math.random() * 0.3];

    return new MyFlower(scene, flowerRadius, numPetals, petalsColor, receptacleRadius, receptacleColor, stemRadius, stemSize, stemColor, leavesColor);
}

export class MyGarden extends CGFobject {
	constructor(scene, rows, columns, startPosition = {x: 0, y: 0, z: 0}) {
		super(scene);

        this.flowerMatrix = new Array(rows);
        this.rows = rows;
        this.columns = columns;
        this.startPosition = startPosition;

        for (let i = 0; i < this.rows; i++) {
            this.flowerMatrix[i] = new Array(columns);
            for (let j = 0; j < this.columns; j++) {
                let flower = generateRandomFlower(this.scene);
                flower.updatePollenPickupPosition(this.startPosition.x + 7 * j, this.startPosition.y, this.startPosition.z + 7 * i);
                this.flowerMatrix[i][j] = flower;
            }
        }
	}
	
	display() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.scene.pushMatrix();
                this.scene.translate(this.startPosition.x + 7 * j, this.startPosition.y, this.startPosition.z + 7 * i);
                this.flowerMatrix[i][j].display();
                this.scene.popMatrix();
            }
        }
    }

    updateRows(numRows) {
        if (numRows < this.rows) {
            this.flowerMatrix.length = numRows;
        } else if (numRows > this.rows) {
            for (let i = this.rows; i < numRows; i++) {
                this.flowerMatrix[i] = new Array(this.columns);
                for (let j = 0; j < this.columns; j++) {
                    let flower = generateRandomFlower(this.scene);
                    flower.updatePollenPickupPosition(this.startPosition.x + 7 * j, this.startPosition.y, this.startPosition.z + 7 * i);
                    this.flowerMatrix[i][j] = flower;
                }
            }
        }

        this.rows = numRows;
    }

    updateCols(numCols) {
        if (numCols < this.columns) {
            for (let i = 0; i < this.rows; i++) {
                this.flowerMatrix[i].length = numCols;
            }
        } else if (numCols > this.columns) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = this.columns; j < numCols; j++) {
                    let flower = generateRandomFlower(this.scene);
                    flower.updatePollenPickupPosition(this.startPosition.x + 7 * j, this.startPosition.y, this.startPosition.z + 7 * i);
                    this.flowerMatrix[i][j] = flower;
                }
            }
        }
        this.columns = numCols;
    }
}
