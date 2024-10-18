#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uPMatrix;
uniform mat4 uMVMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;
uniform float amplitude;
uniform float frequency;
uniform float phaseShift;
uniform float height;

varying vec2 vTexCoord;
varying vec3 vNormal;

void main() {
    vec3 pos = aVertexPosition;

    // Calculate the attenuation factor based on the y-coordinate
    float attenuation = pos.y / height;

    // Apply sine wave for flapping motion with phase shift based on y-coordinate and attenuation
    pos.z += amplitude * attenuation * sin(frequency * timeFactor + pos.y * phaseShift);

	gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);
    vTexCoord = aTextureCoord;
    vNormal = aVertexNormal;
}
