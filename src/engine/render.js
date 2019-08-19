import vshader from "./shaders/vshader.vert"
import fshader from "./shaders/fshader.frag"
import {compile, enable_vertex_attrib} from "./shader_tool"

const MAX_VERTS = 1024 * 64
const MAX_LIGHT = 16

const TEXTURE_SIZE = 1024
const TILE_SIZE = 16
const TILE_FRACTION = TILE_SIZE / TEXTURE_SIZE

const PX_NUDGE = 0.5 / TEXTURE_SIZE

export class Render {
    constructor(gl, canvas) {
        this.gl = gl
        this.canvas = canvas

        this.vertex_count = 0
        this.lights_count = 0
        this.level_vertex_count = 0

        this.light_data = new Float32Array(MAX_LIGHT * 7)
        this.buffer_data = new Float32Array(MAX_VERTS * 8)

        this.camera_u = null
        this.light_u = null

    }

    init() {
        const gl = this.gl

        const vBuffer = gl.createBuffer()
        this.bufferData = new Float32Array(MAX_VERTS * 8)
        
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, this.bufferData, gl.DYNAMIC_DRAW)
        
        const shaderProgram = gl.createProgram()
        
        const compileShader = compile(gl)
        const enableVertexCurry = enable_vertex_attrib(gl, shaderProgram)
        
        gl.attachShader(shaderProgram, compileShader(gl.VERTEX_SHADER, vshader))
        gl.attachShader(shaderProgram, compileShader(gl.FRAGMENT_SHADER, fshader))
        
        gl.linkProgram(shaderProgram)
        gl.useProgram(shaderProgram)
        
        
        this.camera_u = gl.getUniformLocation(shaderProgram, "cam")
        this.light_u = gl.getUniformLocation(shaderProgram, "l")
        
        // gl.enable(gl.DEPTH_TEST)
        // gl.enable(gl.BLEND)
        
        // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
        gl.viewport(0, 0, this.canvas.width, this.canvas.height)
        
        enableVertexCurry('p', 3, 8, 0);
        enableVertexCurry('uv', 2, 8, 3);
        enableVertexCurry('n', 3, 8, 5);
    }
    
    prepare_frame() {
        this.vertex_count = this.level_vertex_count
        this.lights_count = 0

        this.light_data.fill(1)
    }

    end_frame(cam) {

        const gl = this.gl

        gl.uniform3f(this.camera_u, cam.x, cam.y, cam.z)
        gl.uniform1fv(this.light_u, this.light_data)

        gl.clearColor(.2, .4, .5, 1)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        gl.bufferData(gl.ARRAY_BUFFER, this.bufferData, gl.DYNAMIC_DRAW)
        gl.drawArrays(gl.TRIANGLES, 0, this.vertex_count)
    }

    push_quad(p0, p1, p2, p3, n, tile) {
        const u = tile * TILE_FRACTION + PX_NUDGE
        this.bufferData.set([
            p0.x, p0.y, p0.z, u, 0, nx, ny, nz,
            p1.x, p1.y, p1.z, u + TILE_FRACTION - PX_NUDGE, 0, nx, ny, nz,
            p2.x, p2.y, p2.z, u, 1, nx, ny, nz,
            p1.x, p1.y, p1.z, u + TILE_FRACTION - PX_NUDGE, 0, nx, ny, nz,
            p2.x, p2.y, p2.z, u, 1, nx, ny, nz,
            p3.x, p3.y, p3.z, u + TILE_FRACTION - PX_NUDGE, 1, nx, ny, nz
	    ], this.vertex_count * 8)
	    this.vertex_count += 6;
    }

}
