import {CGFobject, CGFtexture} from '../lib/CGF.js';
import {MyGrassBlade} from './MyGrassBlade.js';

export class MyGrassField extends CGFobject {
    constructor(scene, numBlades, grassBladeShader) {
        super(scene);

        this.numBlades = numBlades;
        this.grassBladeShader = grassBladeShader;
        this.grassBlades = [];
        this.shaderValues = [];

        this.grassBladeOffsets = [];
        this.minOffset = -0.5;
        this.maxOffset = 0.5;

        for (let i = 0; i < numBlades; i++) {
            const height = Math.random() * 3 + 3;
            const segments = Math.round(height * 20 / 5);
            const curvature = Math.random() - 0.5;
            const amplitude = Math.random() * 0.75 + 0.25;

            this.grassBlades.push(new MyGrassBlade(this.scene, height, segments, curvature));
            this.shaderValues.push({ amplitude: amplitude, frequency: 0.75, phaseShift: 0.5, height: height });
        }

        const bladesPerRow = Math.trunc(Math.sqrt(this.numBlades));
        const maxOffset = 0.5;
        const minOffset = -0.5;

        for (let i = 0; i < bladesPerRow; i++) {
            const offsetsRow = [];
            for (let j = 0; j < bladesPerRow; j++) {
                const randomOffset = Math.random() * (maxOffset - minOffset) + minOffset;
                offsetsRow.push(randomOffset);
            }
            this.grassBladeOffsets.push(offsetsRow);
        }

        this.textureGrass = new CGFtexture(scene, "images/greenRough.jpeg");
    }
    
    display() {
        const areaSize = 50;
        const bladesPerRow = Math.trunc(Math.sqrt(this.numBlades));
        const spacing = areaSize / bladesPerRow;

        this.textureGrass.bind();

        this.scene.setActiveShader(this.grassBladeShader);

        for (let i = 0; i < bladesPerRow; i++) {
            for (let j = 0; j < bladesPerRow; j++) {
                const randomOffset = this.grassBladeOffsets[i][j];

                this.grassBladeShader.setUniformsValues(this.shaderValues[i * bladesPerRow + j]);

                this.scene.pushMatrix();
                this.scene.translate(this.grassBlades[i * bladesPerRow + j].baseWidth / 2 + j * (spacing + randomOffset), 0, i * (spacing + randomOffset));
                this.grassBlades[i * bladesPerRow + j].display();
                this.scene.popMatrix();
            }
        }

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
