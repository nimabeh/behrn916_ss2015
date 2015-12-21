#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 mouse;
uniform vec2 u_resolution;


uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;


void main( void ) 
{

	vec2 uv = ( gl_FragCoord.xy / u_resolution.xy ) * 2.0 - 1.0;
	uv.x *= u_resolution.x/u_resolution.y;
	
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	
	vec3 finalColor = vec3( 0.0, 0.0, 0.0 );

	float a = atan( uv.y / uv.x );
	float r = length( uv );
	

	float u_timeT = sin(u_time) * 0.5 + 0.5;
	float move = mix( -0.8, 0.8, u_timeT );
	
     	float t = abs( sin(((a + r*move)* 3.0)) * 1.0 );
    
     	finalColor += vec3( 8.0 * t, 4.0 * t, 2.0 * t );
    
     	finalColor *= 1.0-r;
	
	float g = -mod( gl_FragCoord.y + u_time, cos( gl_FragCoord.x ) + 0.0004 ) * 0.5;
	finalColor *= vec3( 0.0, g, 0.0 );

	vec4 color = texture2D(u_tex0,st);
	

	 color *= vec4( finalColor, 1.0 );

	 	gl_FragColor = color;

}

// code sample from xdpixel.com