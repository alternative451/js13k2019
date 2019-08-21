import {Canvas} from "./engine/canvas"
import {ClFrame} from "./game/world"
import {V3d} from "./lib/v3d"

const c = new Canvas()
const ctx = c.getContext()

const GAME_STATES = {
    MENU: 0,
    LOAD: 1,
    PLAY: 2,
    EDIT: 3,
}

let now = performance.now()
let delta = 0

const clFrame = new ClFrame(ctx, c)
const cam = new V3d(0,0,0)

window.gameState = GAME_STATES.MENU

const loop = () => {
    now = performance.now()
    clFrame.draw(cam)
 
    if(DEBUG) {
        delta = (performance.now() - now).toFixed(2)
        window.ctx.innerText = `${delta} - ${16 - delta}`, 20, 10
    }
    clFrame.update(delta)


    requestAnimationFrame(loop)
}

loop()
