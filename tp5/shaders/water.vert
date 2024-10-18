attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor;

uniform sampler2D uSampler2;

varying vec2 vTextureCoord;

void main() {
    vec3 offset = vec3(0.0,0.0,0.0);

    vec2 aCoord = aTextureCoord + vec2(timeFactor * 0.0125, timeFactor * 0.0125);

    vTextureCoord = aCoord;

    offset.z = texture2D(uSampler2, vTextureCoord).b * 0.06;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

    
}

