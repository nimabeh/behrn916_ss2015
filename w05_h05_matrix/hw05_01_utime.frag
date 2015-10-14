#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/4.)) + 
            box(_st, vec2(_size/4.,_size));
}

float almostIdentity( float x, float m, float n ){

 float a = 2.0*n - m;
 float b = 2.0*m - 3.0*n;
 float t = x/m;

    return (a*t + b)*t*t + n;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
        
    // To move the cross we move the space
    vec2 translate = vec2(cos(u_time),sin(u_time));
    st += almostIdentity (cos(u_time)/5.0,sin(u_time)/5.0, 0.01);

    // Show the coordinates of the space on the background
    color = vec3(1.0,st.y,cos(u_time));

    // Add the shape on the foreground
    color += vec3(cross(st,0.25));

    gl_FragColor = vec4(color,1.0);
}