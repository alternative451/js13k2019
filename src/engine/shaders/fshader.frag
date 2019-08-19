precision highp float;
varying vec3 vl;
varying vec2 vuv;
uniform sampler2D s;

void main(void){
    vec4 t=texture2D(s,vuv);
    if(t.a<.8) // 1) discard alpha
        discard;

    // 3) calculate color with lights and fog
    gl_FragColor=t*vec4(vl,1.);
    gl_FragColor.rgb*=smoothstep(
        112.,16., // fog far, near
        gl_FragCoord.z/gl_FragCoord.w // fog depth
    );

    gl_FragColor.rgb=floor(gl_FragColor.rgb*6.35)/6.35; // reduce colors to ~256
}
