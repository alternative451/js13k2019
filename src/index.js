import {Canvas} from "./engine/canvas"
import {ClFrame} from "./game/world"
import level from "./levels/world1"
import {V3d} from "./lib/v3d"

import {Inputs} from './game/inputs'
import { Editor } from "./game/editor";
const c = new Canvas(true)

window.inputs = new Inputs()
const context = c.getContext()
const cam = new V3d(0,100,0)

const GAME_STATES = {
    MENU: 0,
    LOAD: 1,
    PLAY: 2,
    EDIT: 3,
}

let now = performance.now()
let delta = 0

const clFrame = new ClFrame(context, cam)
const ed = new Editor(clFrame)

//clFrame.load(level) 
clFrame.createCowLevel(cowSize.value)

window.gameState = GAME_STATES.MENU
window.gameStates = GAME_STATES

const loop = () => {
    c.element.width += 0
    now = performance.now()
    clFrame.render(cam)
    ed.render(cam)
 
    if(DEBUG) {
        delta = (performance.now() - now).toFixed(2)
        window.ctx.innerText = `${delta} - ${16 - delta}`, 20, 10
    }
    clFrame.update(delta)
    ed.update(delta)

    requestAnimationFrame(loop)
}

loop()
