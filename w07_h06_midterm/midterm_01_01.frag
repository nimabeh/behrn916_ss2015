#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(vec2 st, float radius) {
    st -= .5;
    return 1.0-step (radius*0.5, length(st)*2.);
    
}


void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.);
    st *= 30.0;
 
   
    st = fract(st);

    color.gb= st*cos(u_time);
    float pct = circle(st*cos(u_time), 0.5*cos(u_time));
    color += 1.0-pct;
	gl_FragColor = vec4(color,1.0);
}
