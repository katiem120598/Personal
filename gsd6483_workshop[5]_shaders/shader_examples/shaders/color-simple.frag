#ifdef GL_ES
precision mediump float;
#endif

// A fragment shader is a simple program with a main function, 
// used to decide the color of the current pixel.
void main() {
    // Define an RGBA color with a vector!
    // Note that GLSL uses normalized colors:
    vec4 red = vec4(1.0, 0.0, 0.0, 1.0);

    // Assign the color to the built-in GLSL variable gl_FragColor
    gl_FragColor = red;
}