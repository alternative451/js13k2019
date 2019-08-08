export const compile = gl => (type, source) => {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    return shader
}

export const enable_vertex_attrib = (gl, shader_program) => (attrib_name, count, vertex_size, offset) => {
	var location = gl.getAttribLocation(shader_program, attrib_name);
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, count, gl.FLOAT, false, vertex_size * 4, offset * 4);
}