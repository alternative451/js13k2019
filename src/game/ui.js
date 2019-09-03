import { project } from "../lib/isometric_helper"
import { V3d } from "../lib/v3d";
import { Inputs } from "./inputs";

export class UI {
    constructor(world, ctx) {
        this.world = world
        this.ctx = ctx
        this.proj = new V3d()

        window.ui_push = (i) => this.uiPush(i)
    }
    
    uiPush(i) {
        this.world.selected.addOrder(i)
    }

    render(cam) {

        
        if(this.world.selected) {
            project(this.world.selected.pos, this.proj)

            if (DEBUG.UI) {
                debugInput.innerHTML = this.proj
            }

            tile_ui.style.left = `${this.proj.x + cam.x}px`
            tile_ui.style.top = `${this.proj.y + cam.y}px`

        }
    }


    update(dt) {
        if (inputs.isMouseDown) {

        }
    }
    
}