#ifdef GL_ES
precision mediump float;
#endif
/* Sorry, I don't know how to shader */
uniform float u_time;
uniform vec2 u_resolution;

float hash (float v) {
  return smoothstep(0.1, 0.8, abs(sin(v))) * 33.0;
}

void main(void) {
    vec3 c = vec3(sin(gl_FragCoord*100.1*sin(sin(u_time)*0.02)));
 	c *= vec3(sin(gl_FragCoord*100.2*sin(sin(u_time)*0.03)));
	
    gl_FragColor = vec4(c, 1.0);
}