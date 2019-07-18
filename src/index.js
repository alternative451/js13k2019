import {Canvas} from "./engine/canvas"
import {clFrame} from "./engine/cl_frame"

const c = new Canvas()
window.ctx = c.get2DContext()

let now = performance.now()
let delta = 0

const loop = () => {
    c.clean()

    now = performance.now()


    clFrame()
 
    if(DEBUG) {
        delta = performance.now() - now
        ctx.fillText(`${delta} - ${16 - delta}`, 20, 10)
    }


    requestAnimationFrame(loop)
}


loop()

