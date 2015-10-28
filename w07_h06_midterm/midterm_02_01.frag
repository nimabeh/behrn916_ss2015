#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

void main( void ) {

	vec2 position = ( gl_FragCoord.xy / u_resolution.xy );
	vec2 uv = (position-0.5)*8.;
	uv.x *= u_resolution.x/u_resolution.y;
	float y = sin(10.0*uv.x*sin(u_time));
	float d = abs(uv.y+y);
	
	vec3 color = vec3(0.);	
	color.r = smoothstep(0.1,0.8,sqrt(d-0.4))*tan(gl_FragCoord.x);
	color.g = smoothstep(0.1,0.5,(d-0.6))*cos(gl_FragCoord.x);
	color.b = smoothstep(0.,0.2,(d-2.0))*sin(gl_FragCoord.x);
	gl_FragColor = vec4( color.bbr, 1.0 );

}