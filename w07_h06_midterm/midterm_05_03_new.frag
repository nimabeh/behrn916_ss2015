#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 mouse;
uniform vec2 u_resolution;

#define pi 3.141592653589

#define p_width 0.005
#define p_length 0.4
#define fade_power 2.0
#define edge_roundness 2.0   // 2.0 is circle, >2.0 is more square

float random (float x) {
    return fract(sin(x)*10e5);
}

float random (vec2 xy) {
    return fract(sin(dot(xy,vec2(12.9898,78.233)))*43758.5453123);
}

vec2 rotate2D (vec2 _st, float _angle, float myw, float myh) {
    _st += myw;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += myh;
    return _st;
}

vec3 mainrd(vec2 p, float mya, float myw, float myh) {

	p = ( gl_FragCoord.xy / u_resolution.xy ) * 3.0 - 1.5;	
	p.x *= u_resolution.x/u_resolution.y;

	p = rotate2D(p*2.0,pi*mya, myw, myh);

	float p_t = p.y;
	
	float t = abs(p_width/ pow( p_t, fade_power));
	
	float ramp = cos(pi*p.x);

	float ramp1 = 1.0-step(p.x, -p_length);
	
	float ramp2 = step(p.x, p_length);
	
	
	t = ramp1*ramp2*t;
	
	vec3 col = vec3(0.0, t, t);
	vec2 pos1 = vec2(p_length, 0.0);
	vec2 pos2 = vec2(-p_length, 0.0);
	
	float power = edge_roundness;
		
	float r1 = pow( ( pow((p.x-pos1.x), power) + pow((p.y-pos1.y), power) ), 1.0/power);
	
	float r2 = pow( ( pow((p.x-pos2.x), power) + pow((p.y-pos2.y), power) ), 1.0/power);
	
	float ramp3 = 1.-step(p.x, p_length);
	float ramp4 = step(p.x, -p_length);
	
	float q1 = abs(p_width/pow(r1, fade_power));
	q1 = ramp3*q1;
	
	col += vec3(0.0, q1, q1);	
	
	float q2 = abs(p_width/pow(r2, fade_power));
	q2 = ramp4*q2;
	
	return vec3(t,q1,q2);	
}

void main(void){
	vec3 color = vec3(0.);
	vec2 p1 = ( gl_FragCoord.xy / u_resolution.xy );

	vec3 pct1 = mainrd(p1, 0.25,0.3,0.0);
	vec3 pct2 = mainrd(p1, 0.0,0.4,0.5);
	vec3 pct3 = mainrd(p1, 0.5,1.3,0.0);
	vec3 pct4 = mainrd(p1, 0.75,0.3,0.0);
	vec3 pct5 = mainrd(p1, 0.25,1.2,0.2);


	color = vec3(0.0, pct1.x+pct1.y+pct1.z, pct1.x+pct1.y+pct1.z);
	// color += vec3(0.0, pct2.x+pct2.y+pct2.z, pct2.x+pct2.y+pct2.z);
	// color += vec3(0.0, pct3.x+pct3.y+pct3.z, pct3.x+pct3.y+pct3.z);

	color += vec3(0.0, pct4.x+pct4.y+pct4.z, pct4.x+pct4.y+pct4.z);
	// color += vec3(0.0, pct5.x+pct5.y+pct5.z, pct5.x+pct5.y+pct5.z);
	color.gb *= fract(color.gb);

	vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    st *= vec2(10.);
    
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
    
    float time = floor(u_time*10.);
    float pct = random(i_st+vec2(0.,time));
    
    color *= vec3(pct); 

	gl_FragColor = vec4(color, 1.0);

}




