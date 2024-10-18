import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyBeeHead } from './components/bee/MyBeeHead.js';
import { MyBeeTorax } from './components/bee/MyBeeTorax.js';
import { MyBeeAbdomen } from './components/bee/MyBeeAbdomen.js';
import { MyBeeForeleg } from './components/bee/MyBeeForeleg.js';
import { MyBeeMiddleLeg } from './components/bee/MyBeeMiddleLeg.js';
import { MyBeeHindLeg } from './components/bee/MyBeeHindLeg.js';
import { MyBeeEye } from './components/bee/MyBeeEye.js';
import { MyBeeAntennae } from './components/bee/MyBeeAntennae.js';
import { MyBeeForewing } from './components/bee/MyBeeForewing.js';
import { MyBeeHindWing } from './components/bee/MyBeeHindWing.js';
import { MyBeeStinger } from './components/bee/MyBeeStinger.js';
import { MyBeeMandible } from './components/bee/MyBeeMandible.js';

export class MyBee extends CGFobject {
	constructor(scene, animated = false, s=0, e=0.3, st=0, d=0.5, position = { x: 0, y: 3, z: 0 }, orientation = 0) {
		super(scene);
        this.animated = animated;

        this.startVal = s;
        this.endVal = e;
        this.animStartTimeSecs = st;
        this.animDurationSecs = d;
        this.length = (this.endVal - this.startVal);
        this.animVal = this.startVal;
        this.animVal2 = this.startVal;

        this.position = position;
        this.orientation = orientation;
        this.velocity = { x: 0, y: 0, z: 0 };

        this.speedFactor = 1;
        this.scaleFactor = 1;

        this.pickingPollen = false;
        this.resumingMovement = false;
        this.droppingPollen = false;
        this.previousHeight = position.y;
        this.previousVelocity = { x: 0, y: 0, z: 0 };
        this.gravity = 0;
        this.moveDestination = null;

        this.materialBlackComponents = new CGFappearance(this.scene);
        this.materialBlackComponents.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.materialBlackComponents.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.materialBlackComponents.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.materialBlackComponents.setEmission(0.0, 0.0, 0.0, 0.0);
        this.materialBlackComponents.setShininess(1.0);

        this.materialWings = new CGFappearance(this.scene);
        this.materialWings.setAmbient(1.0, 1.0, 1.0, 0.1);
        this.materialWings.setDiffuse(1.0, 1.0, 1.0, 0.1);
        this.materialWings.setSpecular(1.0, 1.0, 1.0, 0.1);
        this.materialWings.setEmission(0, 0, 0, 0.1);
        this.materialWings.setShininess(1.0);

        this.head = new MyBeeHead(this.scene);
        this.torax = new MyBeeTorax(this.scene);
        this.abdomen = new MyBeeAbdomen(this.scene);
        this.foreleg = new MyBeeForeleg(this.scene, this.materialBlackComponents);
        this.middleleg = new MyBeeMiddleLeg(this.scene, this.materialBlackComponents);
        this.hindleg = new MyBeeHindLeg(this.scene, this.materialBlackComponents);
        this.pollenGrain = null;
        this.antennae = new MyBeeAntennae(this.scene, this.materialBlackComponents);
        this.eye = new MyBeeEye(this.scene);
        this.forewing = new MyBeeForewing(this.scene, this.materialWings);
        this.hindwing = new MyBeeHindWing(this.scene, this.materialWings);
        this.stinger = new MyBeeStinger(this.scene, this.materialBlackComponents);
        this.mandible = new MyBeeMandible(this.scene, this.materialBlackComponents);
	}

    moveToDestination(destination) {
        this.gravity = -9.8;
        this.previousHeight = this.position.y;
        this.previousVelocity = { ...this.velocity };
        this.moveDestination = destination;

        // Calculate direction vector (horizontal plane)
        let dx = destination.x - this.position.x;
        let dz = destination.z - this.position.z;
        let horizontalDistance = Math.sqrt(dx * dx + dz * dz);

        // Time to reach the destination (assuming a given horizontal speed)
        let speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z);
        let timeToDestination = horizontalDistance / speed;

        // Calculate initial vertical velocity to reach the destination at the same time
        let dy = destination.y - this.position.y;
        let initialVerticalVelocity = dy / timeToDestination - 0.5 * this.gravity * timeToDestination;

        // Normalize direction vector
        this.direction = { x: dx / horizontalDistance, y: 0, z: dz / horizontalDistance };

        // Update velocity to move towards the destination with parabolic trajectory
        this.velocity.x = this.direction.x * speed;
        this.velocity.y = initialVerticalVelocity;
        this.velocity.z = this.direction.z * speed;
    }

    resumePreviousMovement() {
        this.resumingMovement = true;

        // Calculate direction to move vertically towards previous height
        let dy = this.previousHeight - this.position.y;
        let length = Math.abs(dy);
        this.direction = { x: 0, y: dy / length, z: 0 };

        // Set vertical velocity to move towards previous height
        let speed = Math.sqrt(this.previousVelocity.x * this.previousVelocity.x + this.previousVelocity.y * this.previousVelocity.y + this.previousVelocity.z * this.previousVelocity.z);
        this.velocity.x = 0;
        this.velocity.y = this.direction.y * speed;
        this.velocity.z = 0;
    }

    update(timeSinceAppStart) {
    	var elapsedTimeSecs = timeSinceAppStart - this.animStartTimeSecs;
        var speed = 2;

        this.animVal = this.length * Math.sin(2 * Math.PI * timeSinceAppStart);
        this.animVal2 = Math.sin(elapsedTimeSecs * Math.PI * speed / this.animDurationSecs);
        
        var delta_t = 1 / 60; // Assuming a frame rate of 60 FPS

        if (this.resumingMovement) {
            let dy = this.previousHeight - this.position.y;
            let distance = Math.abs(dy);

            if (distance < Math.abs(this.velocity.y * delta_t)) {
                // Adjust to exact height
                this.position.y = this.previousHeight;
                this.resumingMovement = false;

                // Resume previous horizontal movement
                this.velocity = { ...this.previousVelocity };
            }
        } else if (this.pickingPollen || this.droppingPollen) {
            let dx = this.moveDestination.x - this.position.x;
            let dy = this.moveDestination.y - this.position.y;
            let dz = this.moveDestination.z - this.position.z;
            let distanceSquared = dx * dx + dy * dy + dz * dz;

            if (distanceSquared < (this.velocity.x * delta_t) * (this.velocity.x * delta_t) + 
                                (this.velocity.y * delta_t) * (this.velocity.y * delta_t) + 
                                (this.velocity.z * delta_t) * (this.velocity.z * delta_t)) {
                // Adjust to exact position
                this.position.x = this.moveDestination.x;
                this.position.y = this.moveDestination.y;
                this.position.z = this.moveDestination.z;
                this.velocity.x = 0;
                this.velocity.y = 0;
                this.velocity.z = 0;
                this.gravity = 0;
            }
        }

        // Apply gravity to the vertical component of velocity
        this.velocity.y += this.gravity * delta_t;

        // Update position
        this.position.x += this.velocity.x * delta_t;
        this.position.y += this.velocity.y * delta_t;
        this.position.z += this.velocity.z * delta_t;
    }

    updateSpeedFactor(speedFactor) {
        this.speedFactor = speedFactor;
    }

    updateScaleFactor(scaleFactor) {
        this.scaleFactor = scaleFactor;
    }

    turn(v) {
        let turnAngle = v * this.speedFactor;
        this.orientation += turnAngle;
        this.updateVelocityDirection();
    }

    accelerate(v) {
        let acceleration = v * this.speedFactor;
        let speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y + this.velocity.z * this.velocity.z);
        speed = Math.max(0, speed + acceleration);
        this.updateVelocityMagnitude(speed);
    }

    updateVelocityDirection() {
        var speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y + this.velocity.z * this.velocity.z);
        this.velocity.x = speed * Math.sin(this.orientation);
        this.velocity.z = speed * Math.cos(this.orientation);
    }

    updateVelocityMagnitude(speed) {
        this.velocity.x = speed * Math.sin(this.orientation);
        this.velocity.z = speed * Math.cos(this.orientation);
    }
	
	display() {
        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y + this.animVal, this.position.z);
        this.scene.rotate(this.orientation, 0, 1, 0);

        this.scene.scale(0.5 * this.scaleFactor, 0.5 * this.scaleFactor, 0.5 * this.scaleFactor);

        if (this.pollenGrain !== null) {
            this.scene.pushMatrix();
            this.scene.translate(-0.95, -0.65, -0.95);
            this.scene.rotate(Math.PI/6, 1, 0, 0);
            this.scene.rotate(-Math.PI/6, 0, 0, 1);
            this.pollenGrain.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0.95, -0.65, -0.95);
            this.scene.rotate(Math.PI/6, 1, 0, 1);
            this.pollenGrain.display();
            this.scene.popMatrix();
        }

        this.scene.pushMatrix();
        this.scene.translate(0, -1.25, -0.85);
        this.scene.rotate(-Math.PI/3, 1, 0, 0);
        this.abdomen.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.2, 0.34);
        this.scene.rotate(-Math.PI/9, 1, 0, 0);
        this.torax.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
		this.scene.translate(0, 0, 1);
        this.scene.rotate(-Math.PI/6, 1, 0, 0);
        this.head.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.375, 0, 1);
        this.scene.rotate(-Math.PI/6, 1, 0, 0);
        this.eye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.375, 0, 1);
        this.scene.rotate(-Math.PI/6, 1, 0, 0);
        this.eye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.35, -0.3, -0.25);
        this.scene.rotate(-9*Math.PI/7, 0, 1, 0);
        this.hindleg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.35, -0.3, -0.25);
        this.scene.rotate(Math.PI/3.5, 0, 1, 0);
        this.hindleg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, -0.35, 0.1);
        this.scene.rotate(9*Math.PI/8, 0, 1, 0);
        this.middleleg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, -0.35, 0.1);
        this.scene.rotate(-Math.PI/8, 0, 1, 0);
        this.middleleg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.45, -0.4, 0.4);
        this.scene.rotate(7*Math.PI/5, 0, 1, 0);
        this.foreleg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.45, -0.4, 0.4);
        this.scene.rotate(-Math.PI/2.5, 0, 1, 0);
        this.foreleg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -2.1, -1.35);
        this.scene.rotate(-2 * Math.PI/2.5, 1, 0, 0);
        this.stinger.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.165, -0.4, 1.2);
        this.scene.rotate(-Math.PI/5, 0, 0, 1);
        this.scene.rotate(2 * Math.PI/2.5, 1, 0, 0);
        this.mandible.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.165, -0.4, 1.2);
        this.scene.rotate(Math.PI/5, 0, 0, 1);
        this.scene.rotate(2 * Math.PI/2.5, 1, 0, 0);
        this.mandible.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.15, 0.2, 1.15);
        this.scene.rotate(Math.PI/5, 0, 0, 1);
        this.antennae.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.15, 0.2, 1.15);
        this.scene.rotate(-Math.PI/5, 0, 0, 1);
        this.antennae.display();
        this.scene.popMatrix();

        if (!this.animated) {
            this.scene.pushMatrix();
            this.scene.translate(-0.5, 0.1, 0);
            this.scene.rotate(-Math.PI/4, 0, 1, 0);
            this.scene.rotate(Math.PI/3.5, 0, 0, 1);
            this.scene.translate(0, 0.7, 0);
            this.scene.rotate(Math.PI/2, 0, 0, 1);
            this.scene.translate(0, 0, 0);
            this.hindwing.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0.5, 0.1, 0);
            this.scene.rotate(Math.PI/4, 0, 1, 0);
            this.scene.rotate(-Math.PI/3.5, 0, 0, 1);
            this.scene.translate(0, 0.7, 0);
            this.scene.rotate(Math.PI/2, 0, 0, 1);
            this.hindwing.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-0.7, 0.45, 0);
            this.scene.rotate(-Math.PI/6, 0, 1, 0);
            this.scene.rotate(Math.PI/5, 0, 0, 1);
            this.scene.translate(0, 0.7, 0);
            this.scene.rotate(Math.PI/2, 0, 0, 1);
            this.forewing.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0.7, 0.45, 0);
            this.scene.rotate(Math.PI/6, 0, 1, 0);
            this.scene.rotate(-Math.PI/5, 0, 0, 1);
            this.scene.translate(0, 0.7, 0);
            this.scene.rotate(Math.PI/2, 0, 0, 1);
            this.forewing.display();
            this.scene.popMatrix();
        } else {
            this.scene.pushMatrix();
            this.scene.translate(-0.3, -0.05, -0.1);
            this.scene.rotate(-this.animVal2, 0, 0, 1);
            this.scene.translate(-1, 0, 0);
            this.hindwing.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0.3, -0.05, -0.1);
            this.scene.rotate(this.animVal2, 0, 0, 1);
            this.scene.translate(1, 0, 0);
            this.hindwing.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-0.4, 0, 0.35);
            this.scene.rotate(-this.animVal2, 0, 0, 1);
            this.scene.translate(-1.3, 0, 0);
            this.forewing.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0.4, 0, 0.35);
            this.scene.rotate(this.animVal2, 0, 0, 1);
            this.scene.translate(1.3, 0, 0);
            this.forewing.display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }
}
