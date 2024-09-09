#ifdef GL_ES
precision mediump float;
#endif

// Define constant values
#define TAU 6.2831853071

// Define uniforms that can be passed to this shader.
// We will use 'book of shaders' naming convention.
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


// 2D gradient
void main() {
    // // Component-wise calculation
    // float nx = gl_FragCoord.x / u_resolution.x;
    // float ny = gl_FragCoord.y / u_resolution.y;
    // float nz = fract(0.25 * u_time);

    // // Assign fragment color to built-in `gl_FragColor` variable
    // gl_FragColor = vec4(nx, ny, nz, 1.);


    // Same as above in vector form
    vec2 grad = gl_FragCoord.xy / u_resolution;
    float nz = fract(0.25 * u_time);

    // Assign fragment color to built-in `gl_FragColor` variable
    gl_FragColor = vec4(grad, nz, 1.);
}
