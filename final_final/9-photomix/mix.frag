#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float random (in vec2 st) { 
    return fract(sin(dot(st.xy,
    vec2(12.9898,78.233)))* 
        43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + 
            (c - a)* u.y * (1.0 - u.x) + 
            (d - b) * u.x * u.y;
}

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    float scale = 2.0;
    float offset = 0.5;
    // vec3 c = vec3(sin(gl_FragCoord*100.1*sin(sin(u_time)*0.0002)));

    vec2 position = ( gl_FragCoord.xy / u_resolution.xy );

    // color "float" is the point of contact
    float c = 1.0;
    c += 1.0-sin( position.x*position.y * cos( u_time / 10.0 ) * 80.0 ) + cos( position.y * cos( u_time / 15.0 ) * 10.0 );
    c += 1.0-cos( position.x*position.y * sin( u_time / 25.0 ) * 40.0 ) + sin( position.y * sin( u_time / 10.0 ) * 40.0 );
    c*= 1.0-sin( position.x*position.y * sin( u_time / 5.0 ) * 10.0 ) + sin( position.y * sin( u_time / 35.0 ) * 80.0 );
    c *= 1.0-sin( u_time / 10.0 ) * 0.5;

    
    float angle = noise( st+ u_time * 0.1 )*PI;
    float radius = offset;

    st *= scale;
    st *= radius * vec2(sin(angle),sin(angle));
    st *= c;


    vec4 color = texture2D(u_tex0,fract(st+vec2(u_time,0.)));

    gl_FragColor = color;
}