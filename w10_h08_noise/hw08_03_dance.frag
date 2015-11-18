#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (float x){
	return fract (sin(x)*10e5);
}

float noise (float x){
float i = floor(x);  // integer
float f = fract(x);  // fraction

return  mix(random(i), random(i + 1.0), smoothstep(0.,1.,f));
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;

	st *=vec2 (50.0, 2.0);
	vec2 i_st = floor(st);
	vec2 f_st = fract(st);
	float time = floor(u_time*8.);
	float pct = noise(time+i_st.x); 
	if (i_st.y == 1.){
		f_st.y = 1. - f_st.y;
	}

	vec3 color = vec3(step(pct, f_st.y)- step(0.8, f_st.x));
	gl_FragColor = vec4(color,1.0);
}