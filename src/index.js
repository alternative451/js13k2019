import {Canvas} from "./engine/canvas"

console.log("Hello World from your main file!");

const c = new Canvas()
const ctx = c.get2DContext()

let now = performance.now()
let delta = 0

const DEBUG = true

const loop = () => {
    c.clean()

    now = performance.now()


    ctx.fillStyle = '#132fad'
    ctx.fillRect(0,0,10,10)
 
    if(DEBUG) {
        delta = performance.now() - now
        ctx.fillText(`${delta} - ${16 - delta}`, 30, 30)
    }


    requestAnimationFrame(loop)
}


loop()

