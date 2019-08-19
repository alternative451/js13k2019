import {Canvas} from "./engine/canvas"
import {ClFrame} from "./engine/cl_frame"
import {V3d} from "./lib/v3d"

const c = new Canvas()
const gl = c.getGlContext()

let now = performance.now()
let delta = 0

const clFrame = new ClFrame(gl, c)
const cam = new V3d()

const loop = () => {
    now = performance.now()

    clFrame.draw(cam)
 
    if(DEBUG) {
        delta = (performance.now() - now).toFixed(2)
        window.ctx.innerText = `${delta} - ${16 - delta}`, 20, 10
    }

    requestAnimationFrame(loop)
}

loop()
