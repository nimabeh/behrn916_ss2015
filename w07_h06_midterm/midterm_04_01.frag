#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

void main( void ) {

	vec2 position = ( gl_FragCoord.xy / u_resolution.xy );

	// color "float" is the point of contact
	float color = 0.0;
	color += sin( position.y * cos( u_time / 10.0 ) * 80.0 ) + cos( position.y * cos( u_time / 15.0 ) * 10.0 );
	color += cos( position.y * sin( u_time / 25.0 ) * 40.0 ) + sin( position.y * sin( u_time / 10.0 ) * 40.0 );
	color *= sin( position.y * sin( u_time / 5.0 ) * 10.0 ) + sin( position.y * sin( u_time / 35.0 ) * 80.0 );
	color *= sin( u_time / 10.0 ) * 0.5;

	gl_FragColor = vec4( vec3( color, 0.0, color*sin( color + u_time / 3.0 ) * 0.75 ), 1.0 );

}