import {Canvas} from "./engine/canvas"
import {ClFrame} from "./engine/cl_frame"

const c = new Canvas()
const gl = c.getGlContext()

let now = performance.now()
let delta = 0

const clFrame = new ClFrame(gl, c)

const loop = () => {
    now = performance.now()


    clFrame.draw()
 
    if(DEBUG) {
        delta = performance.now() - now
        ctx.fillText(`${delta} - ${16 - delta}`, 20, 10)
    }


    requestAnimationFrame(loop)
}


loop()

