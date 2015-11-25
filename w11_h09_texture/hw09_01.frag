#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;


void main(){
	vec3 c=vec3(0,0,0);
	float l,z=u_time;
	
	for(int i=0;i<3;i++) {
		
		vec2 uv,p=gl_FragCoord.xy/u_resolution;
		uv=p;
		p-=.5;
		p.x*=u_resolution.x/u_resolution.y;
		z+=.7;
		l=length(p*p);
		uv+=p/l*(sin(z)+1.)*abs(sin(l*18.-z*2.));
		c[i]=.01/length(abs(mod(uv,1.)-.2));
	}
	gl_FragColor=vec4(c/l,u_time);
}
