import {CGFobject} from '../lib/CGF.js';

/**
 * GrassBlade
 * @constructor
 * @param scene - Reference to MyScene object
 * @param height - Height of the blade of grass
 * @param segments - Number of segments along the height
 * @param curvature - Curvature factor of the blade
 */
export class MyGrassBlade extends CGFobject {
    constructor(scene, height, segments, curvature) {
        super(scene);
        this.height = height;
        this.baseWidth = height * 0.2;
        this.segments = segments;
        this.curvature = curvature;
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        this.baseWidth = this.height * 0.2;
        let halfWidth = this.baseWidth / 2;
        let segmentHeight = this.height / this.segments;

        // Create vertices for each segment
        for (let i = 0; i <= this.segments; i++) {
            let y = i * segmentHeight;
            let currentWidth = halfWidth * (1 - (i / this.segments));  // Linearly decrease width

            // Apply curvature: x = curvature * (y / height)^2
            let curvatureOffset = this.curvature * Math.pow(y / this.height, 2);

            // Vertices at current segment
            if (i < this.segments) {
                this.vertices.push(-currentWidth + curvatureOffset, y, 0);  // Left vertex (front face)
                this.vertices.push(currentWidth + curvatureOffset, y, 0);   // Right vertex (front face)
                this.normals.push(0, 0, 1);               // Normal for left vertex (front face)
                this.normals.push(0, 0, 1);               // Normal for right vertex (front face)
                this.texCoords.push(0, 1 - y / this.height);  // Texture coordinate for left vertex (front face)
                this.texCoords.push(1, 1 - y / this.height);  // Texture coordinate for right vertex (front face)

                // Add back face vertices and normals
                this.vertices.push(-currentWidth + curvatureOffset, y, 0);  // Left vertex (back face)
                this.vertices.push(currentWidth + curvatureOffset, y, 0);   // Right vertex (back face)
                this.normals.push(0, 0, -1);              // Normal for left vertex (back face)
                this.normals.push(0, 0, -1);              // Normal for right vertex (back face)
                this.texCoords.push(1, 1 - y / this.height);  // Texture coordinate for left vertex (back face)
                this.texCoords.push(0, 1 - y / this.height);  // Texture coordinate for right vertex (back face)
            } else {
                // Top point has one vertex
                this.vertices.push(curvatureOffset, this.height, 0);    // Top vertex (front face)
                this.normals.push(0, 0, 1);               // Normal for top vertex (front face)
                this.texCoords.push(0.5, 0);              // Texture coordinate for top vertex (front face)

                // Add back face top vertex and normal
                this.vertices.push(curvatureOffset, this.height, 0);    // Top vertex (back face)
                this.normals.push(0, 0, -1);              // Normal for top vertex (back face)
                this.texCoords.push(0.5, 0);              // Texture coordinate for top vertex (back face)
            }
        }

        // Create indices for each segment
        for (let i = 0; i < this.segments; i++) {
            let startIdx = i * 4;
            if (i < this.segments - 1) {
                // Two triangles per segment for front face
                this.indices.push(startIdx, startIdx + 1, startIdx + 4);
                this.indices.push(startIdx + 1, startIdx + 5, startIdx + 4);

                // Two triangles per segment for back face
                this.indices.push(startIdx + 2, startIdx + 6, startIdx + 3);
                this.indices.push(startIdx + 3, startIdx + 6, startIdx + 7);
            } else {
                // One triangle for the top segment for front face
                this.indices.push(startIdx, startIdx + 1, startIdx + 4);

                // One triangle for the top segment for back face
                this.indices.push(startIdx + 2, startIdx + 5, startIdx + 3);
            }
        }

        // Specify that the primitive type is triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        // Initialize the WebGL buffers with the defined data
        this.initGLBuffers();
    }

    updateHeight(height) {
        this.height = height;

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
