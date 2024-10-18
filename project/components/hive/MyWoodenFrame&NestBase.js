import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyPrism } from '../solids/MyPrism.js';
import { MyQuad } from '../shapes/MyQuad.js';
import { MyBee } from '../../MyBee.js';
import { MyPollen } from '../../MyPollen.js';

export class MyWoodenFrameAndNestBase extends CGFobject {
    constructor(scene) {
        super(scene);
        this.prism = new MyPrism(this.scene, 10, 25);
        this.cube = new MyPrism(this.scene, 4, 25);
        this.square = new MyQuad(this.scene);
        this.bee = new MyBee(this.scene);
        this.pollen = new MyPollen(this.scene, 50, 25);

        this.numPollens = 0;
        this.pollenPositions = [];

        this.texture1 = new CGFtexture(this.scene, 'images/whiteWood.png');
        this.material1 = new CGFappearance(this.scene);
        this.material1.setAmbient(0.8157, 0.7255, 0.5294, 1.0);
        this.material1.setDiffuse(0.8157, 0.7255, 0.5294, 1.0);
        this.material1.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.material1.setTexture(this.texture1);
        this.material1.setTextureWrap('REPEAT', 'REPEAT');

        this.texture2 = new CGFtexture(this.scene, 'images/blackHoneycomb.png');
        this.material2 = new CGFappearance(this.scene);
        this.material2.setEmission(0.5, 0.5, 0.5, 1);
        this.material2.setTexture(this.texture2);
        this.material2.setTextureWrap('REPEAT', 'REPEAT');
    }

    placePollen() {
        this.pollenPositions.push({
            x: Math.random() * 5.5 + 0.75,
            z: Math.random() * 4.6 + 0.5
        });
        this.numPollens++;
    }
    
    display() {
        this.scene.pushMatrix();
        this.scene.translate(4.9, -2.2, -0.35);
        this.scene.rotate(-Math.PI/6, 0, 1, 0);
        this.scene.rotate(Math.PI/12, 1, 0, 0);
        this.bee.display();
        this.scene.popMatrix();

        for (let i = 0; i < this.numPollens; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.pollenPositions[i].x, 0, this.pollenPositions[i].z);
            this.pollen.display();
            this.scene.popMatrix();
        }

        this.material2.apply();

        this.scene.pushMatrix();
        this.scene.translate(2.83, 0, 3.44);
        this.scene.scale(5.3, 1, 6.3);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.square.display();
        this.scene.popMatrix();

        this.material1.apply();

        this.scene.pushMatrix();
        this.scene.translate(5.658, 0, 6.8);
        this.scene.scale(0.3, 0.3, 0.35);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.prism.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(5.358, 0, 0);
        this.scene.scale(0.3, 0.3, 0.35);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.prism.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.83, 0, 0);
        this.scene.scale(4, 0.5, 0.3);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(5.358, 0, 3.44);
        this.scene.scale(0.3, 0.4, 4.725);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 3.44);
        this.scene.scale(0.5, 0.3, 4.725);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.83, 0, 6.49);
        this.scene.scale(4, 0.5, 0.3);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.cube.display();
        this.scene.popMatrix();
    }
}