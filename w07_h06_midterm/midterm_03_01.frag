#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 mouse;
uniform vec2 u_resolution;
float PI = 3.14159265358979323846264;
	
void main( void ) {
	vec2 position = ( gl_FragCoord.xy / u_resolution.xy ) * 128.0 + sin(u_time) * PI;
	gl_FragColor = vec4( vec3( sin(position.x * position.x / 512.0) 
		+ sin(u_time), cos(position.x * position.y / 128.0 + sin(u_time*PI)) * 10.0, 0.0), 1.0 );
}