#ifdef GL_ES
precision mediump float;
#endif

// Define uniforms that can be passed to this shader.
// We will use 'book of shaders' uniform names.
uniform vec2 u_resolution;

// 1D gradient
// Main fragment function
void main() {
    // Component-wise calculation
    // float gray = gl_FragCoord.x / u_resolution.x;
    float gray = gl_FragCoord.y / u_resolution.y;

    // Assign fragment color to built-in `gl_FragColor` variable
    gl_FragColor = vec4(gray, gray, gray, 1.);
}
