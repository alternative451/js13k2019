import { V3d } from "../lib/v3d";

export class Inputs {
    constructor() {

        this.mousePos = new V3d()
        this.keys = {}
        this.isMouseDown = false
        window.onkeydown = (e) => {
            this.keys[e.code] = true
        }

        window.onkeyup = (e) => {
            this.keys[e.code] = false
        }

        window.onmousemove = (e) => {
            this.mousePos.set(e.clientX, e.clientY, 0)
        }

        window.onmousedown = (e) => {
            this.isMouseDown = true
        }

        window.onmouseup = (e) => {
            this.isMouseDown = false
        }
    }

    // helpers 
    isUp() {
        debugInput.innerHTML = this.keys 
        return this.keys['KeyZ'] || this.keys['KeyW'] || this.keys['ArrowUp']  
    }
    isDown() {
        return this.keys['KeyS'] || this.keys['ArrowDown']  
    }
}

if(DEBUG.INPUT) {
   // debugInput.innerText = mousePos            
}