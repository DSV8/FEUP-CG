import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MySphere } from './components/solids/MySphere.js';

export class MyPanorama extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.texture = texture;
        this.material = new CGFappearance(this.scene);
        this.material.setTexture(this.texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
        this.material.setEmission(1, 1, 1, 1);
        this.sphere = new MySphere(this.scene, 25, 15, true);
    }

    display() {
        this.scene.pushMatrix();
        this.material.apply();
        let pos = this.scene.camera.position;
        this.scene.translate(pos[0], pos[1], pos[2]);
        this.scene.scale(200, 200, 200);
        this.sphere.display();
        this.scene.popMatrix();
    }
}
