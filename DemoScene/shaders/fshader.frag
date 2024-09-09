#ifdef GL_ES
precision mediump float;
#endif

// Default uniforms in 'Book of Shaders' (platform-specific)
uniform vec2 u_resolution;   // screen size in pixels
uniform vec2 u_mouse;		 // mouse location (XY) and click (ZW) in pixels
uniform float u_time;		 // elapsed program time in seconds
uniform float act1;
uniform float act2;
uniform float act3;
uniform float act4;
uniform float act5;
uniform float act6;
uniform float act7;
uniform float act8;
uniform float start1;
uniform float start2;
uniform float start3;
uniform float start4;
uniform float start5;
uniform float start6;
uniform float start7;
uniform float start8;
uniform float u_duration;



// Main fragment function
void main() {
    // Center of the screen
    vec2 center = 0.5 * u_resolution;
    
    // Distance from this pixel to the center
    //float dist = length(gl_FragCoord.xy - center);
    //float gray = 0.5 * (sin(0.2 * dist - u_time) + 1.0);

    // Distance from this pixel to the mouse
    float etime1 = (u_time-start1)/0.75;
    float wavespeed1 = 5.0;
    float period1 = 30.0;
    float maxdist1 = etime1*wavespeed1*period1;
    float largestdist1 = u_duration*wavespeed1*period1;
    float dist1 = length(gl_FragCoord.xy - (act1/9.0*u_resolution.x,act1/9.0*u_resolution.y));
    float currentringdist1 = mod(dist1,period1);
    float distfact1 = step(dist1,maxdist1);
    float gray1= (1.0-etime1/u_duration)*(1.0-(dist1/largestdist1))*(((sin(dist1*.05-etime1*wavespeed1))*0.5+0.5)*act1*distfact1);
    float r1= 0.8*(1.0-etime1/u_duration)*(1.0-(dist1/largestdist1))*(((sin(dist1*.05-etime1*wavespeed1))*0.5+0.5)*act1*distfact1);
    float b1= 0.05*(1.0-etime1/u_duration)*(1.0-(dist1/largestdist1))*(((sin(dist1*.05-etime1*wavespeed1))*0.5+0.5)*act1*distfact1);

    float etime2 = (u_time-start2)/0.75;
    float wavespeed2 = 5.0;
    float period2 = 30.0;
    float maxdist2 = etime2*wavespeed2*period2;
    float largestdist2 = u_duration*wavespeed2*period2;
    float dist2 = length(gl_FragCoord.xy - (act2*2.0/9.0*u_resolution.x,act2*2.0/9.0*u_resolution.y));
    float currentringdist2 = mod(dist2,period2);
    float distfact2 = step(dist2,maxdist2);
    float gray2= (1.0-etime2/u_duration)*(1.0-(dist2/largestdist2))*(((sin(dist2*.06-etime2*wavespeed2))*0.5+0.5)*act2*distfact2);
    float r2= 0.6*(1.0-etime2/u_duration)*(1.0-(dist2/largestdist2))*(((sin(dist2*.06-etime2*wavespeed2))*0.5+0.5)*act2*distfact2);
    float b2= 0.1*(1.0-etime2/u_duration)*(1.0-(dist2/largestdist2))*(((sin(dist2*.06-etime2*wavespeed2))*0.5+0.5)*act2*distfact2);

    float etime3 = (u_time-start3)/0.75;
    float wavespeed3 = 5.0;
    float period3 = 30.0;
    float maxdist3 = etime3*wavespeed3*period3;
    float largestdist3 = u_duration*wavespeed3*period3;
    float dist3 = length(gl_FragCoord.xy - (act3*3.0/9.0*u_resolution.x,act3*3.0/9.0*u_resolution.y));
    float currentringdist3 = mod(dist3,period3);
    float distfact3 = step(dist3,maxdist3);
    float gray3= (1.0-etime3/u_duration)*(1.0-(dist3/largestdist3))*(((sin(dist3*.08-etime3*wavespeed3))*0.5+0.5)*act3*distfact3);
    float r3= 0.5*(1.0-etime3/u_duration)*(1.0-(dist3/largestdist3))*(((sin(dist3*.08-etime3*wavespeed3))*0.5+0.5)*act3*distfact3);
    float b3= 0.15*(1.0-etime3/u_duration)*(1.0-(dist3/largestdist3))*(((sin(dist3*.08-etime3*wavespeed3))*0.5+0.5)*act3*distfact3);

    float etime4 = (u_time-start4)/0.75;
    float wavespeed4 = 5.0;
    float period4 = 30.0;
    float maxdist4 = etime4*wavespeed4*period4;
    float largestdist4 = u_duration*wavespeed4*period4;
    float dist4 = length(gl_FragCoord.xy - (act4*4.0/9.0*u_resolution.x,act4*4.0/9.0*u_resolution.y));
    float currentringdist4 = mod(dist4,period4);
    float distfact4 = step(dist4,maxdist4);
    float gray4= (1.0-etime4/u_duration)*(1.0-(dist4/largestdist4))*(((sin(dist4*.12-etime4*wavespeed4))*0.5+0.5)*act4*distfact4);
    float r4= 0.4*(1.0-etime4/u_duration)*(1.0-(dist4/largestdist4))*(((sin(dist4*.12-etime4*wavespeed4))*0.5+0.5)*act4*distfact4);
    float b4= 0.2*(1.0-etime4/u_duration)*(1.0-(dist4/largestdist4))*(((sin(dist4*.12-etime4*wavespeed4))*0.5+0.5)*act4*distfact4);

    float etime5 = (u_time-start5)/0.75;
    float wavespeed5 = 5.0;
    float period5 = 30.0;
    float maxdist5 = etime5*wavespeed5*period5;
    float largestdist5 = u_duration*wavespeed5*period5;
    float dist5 = length(gl_FragCoord.xy - (act5*5.0/9.0*u_resolution.x,act5*5.0/9.0*u_resolution.y));
    float currentringdist5 = mod(dist5,period5);
    float distfact5 = step(dist5,maxdist5);
    float gray5= (1.0-etime5/u_duration)*(1.0-(dist5/largestdist5))*(((sin(dist5*.2-etime5*wavespeed5))*0.5+0.5)*act5*distfact5);
    float r5= 0.3*(1.0-etime5/u_duration)*(1.0-(dist5/largestdist5))*(((sin(dist5*.2-etime5*wavespeed5))*0.5+0.5)*act5*distfact5);
    float b5= 0.25*(1.0-etime5/u_duration)*(1.0-(dist5/largestdist5))*(((sin(dist5*.2-etime5*wavespeed5))*0.5+0.5)*act5*distfact5);

    float etime6 = (u_time-start6)/0.75;
    float wavespeed6 = 5.0;
    float period6 = 30.0;
    float maxdist6 = etime6*wavespeed6*period6;
    float largestdist6 = u_duration*wavespeed6*period6;
    float dist6 = length(gl_FragCoord.xy - (act6*6.0/9.0*u_resolution.x,act6*6.0/9.0*u_resolution.y));
    float currentringdist6 = mod(dist6,period6);
    float distfact6 = step(dist6,maxdist6);
    float gray6= (1.0-etime6/u_duration)*(1.0-(dist6/largestdist6))*(((sin(dist6*.36-etime6*wavespeed6))*0.5+0.5)*act6*distfact6);
    float r6= 0.2*(1.0-etime6/u_duration)*(1.0-(dist6/largestdist6))*(((sin(dist6*.36-etime6*wavespeed6))*0.5+0.5)*act6*distfact6);
    float b6= 0.3*(1.0-etime6/u_duration)*(1.0-(dist6/largestdist6))*(((sin(dist6*.36-etime6*wavespeed6))*0.5+0.5)*act6*distfact6);
    

    float etime7 = (u_time-start7)/0.75;
    float wavespeed7 = 5.0;
    float period7 = 30.0;
    float maxdist7 = etime7*wavespeed7*period7;
    float largestdist7 = u_duration*wavespeed7*period7;
    float dist7 = length(gl_FragCoord.xy - (act7*7.0/9.0*u_resolution.x,act7*7.0/9.0*u_resolution.y));
    float currentringdist7 = mod(dist7,period7);
    float distfact7 = step(dist7,maxdist7);
    float gray7= (1.0-etime7/u_duration)*(1.0-(dist7/largestdist7))*(((sin(dist7*.68-etime7*wavespeed7))*0.5+0.5)*act7*distfact7);
    float r7= 0.1*(1.0-etime7/u_duration)*(1.0-(dist7/largestdist7))*(((sin(dist7*.68-etime7*wavespeed7))*0.5+0.5)*act7*distfact7);
    float b7= 0.35*(1.0-etime7/u_duration)*(1.0-(dist7/largestdist7))*(((sin(dist7*.68-etime7*wavespeed7))*0.5+0.5)*act7*distfact7);

    float etime8 = (u_time-start8)/0.75;
    float wavespeed8 = 5.0;
    float period8 = 30.0;
    float maxdist8 = etime8*wavespeed8*period8;
    float largestdist8 = u_duration*wavespeed8*period8;
    float dist8 = length(gl_FragCoord.xy - (act8*8.0/9.0*u_resolution.x,act8*8.0/9.0*u_resolution.y));
    float currentringdist8 = mod(dist8,period8);
    float distfact8 = step(dist8,maxdist8);
    float gray8= (1.0-etime8/u_duration)*(1.0-(dist8/largestdist8))*(((sin(dist8*1.32-etime8*wavespeed8))*0.5+0.5)*act8*distfact8);
    float r8= 0.0*(1.0-etime8/u_duration)*(1.0-(dist8/largestdist8))*(((sin(dist8*1.32-etime8*wavespeed8))*0.5+0.5)*act8*distfact8);
    float b8= 0.4*(1.0-etime8/u_duration)*(1.0-(dist8/largestdist8))*(((sin(dist8*1.32-etime8*wavespeed8))*0.5+0.5)*act8*distfact8);

    float graycombo = gray1+gray2+gray3+gray4+gray5+gray6+gray7+gray8;
    float redcombo = r1+r2+r3+r4+r5+r6+r7+r8;
    float bluecombo = b1+b2+b3+b4+b5+b6+b7+b8;
	
    // Compute gray value based on a modulated sin wave
    
    // See graphs here: https://graphtoy.com/?f1(x,t)=mix(1,0,x/5)&v1=true&f2(x,t)=1-smoothstep(0,5,x)&v2=true&f3(x,t)=&v3=false&f4(x,t)=&v4=false&f5(x,t)=&v5=false&f6(x,t)=&v6=false&grid=1&coords=0,0,12
    
    // Set the RGBA color of this pixel
    // by assigning a vec4 value to the built-in `gl_FragColor` variable
    gl_FragColor = vec4(bluecombo, redcombo, graycombo, 1.0);
}