import {Canvas} from "./engine/canvas"
import {ClFrame} from "./engine/cl_frame"

const c = new Canvas()
const gl = c.getGlContext()

let now = performance.now()
let delta = 0


const clFrame = new ClFrame(context, cam)
const ed = new Editor(clFrame)

//clFrame.load(level) 
clFrame.createCowLevel(cowSize.value)

window.gameState = GAME_STATES.MENU
window.gameStates = GAME_STATES

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
