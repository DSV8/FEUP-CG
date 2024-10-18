#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTexCoord;
varying vec3 vNormal;

uniform sampler2D texture;

void main() {
    gl_FragColor = texture2D(texture, vTexCoord);
}

