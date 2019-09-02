export const IS_SOURCE = 0
export const IS_NO_GPS = 1
export const IS_NO_ACTION = 2
export const IS_EXIT = 3
export const IS_START = 4
export const IS_ORDER_SOURCE = 5

export const EXPORT = 6
export const IMPORT = 7


const buttons = [
    {
        code : -1, color: "#123123", icon: " - ",
    },{
        code : IS_ORDER_SOURCE, color: "#123123", icon: "💦",
    }, {
        code : IS_NO_GPS, color: "#123123", icon: "️clound",
    }, {
        code : IS_NO_ACTION, color: "#123123", icon: "no action",
    }, {
        code : IS_EXIT, color: "#123123", icon: "exit",
    }, {
        code : IS_START, color: "#123123", icon: "start",
    }, {
        code : EXPORT, color: "#123123", icon: "exp",
    }, {
        code : IMPORT, color: "#123123", icon: "imp",
    }
]
window.editor_mode = -1
export class Editor {
    constructor(world) {
        this.world = world
        // UI

        buttons.forEach((button) => {
            const HTMLbutton = document.createElement("button")
            HTMLbutton.innerText = button.icon
            HTMLbutton.onclick = () => window.switch(button.code)
            button.handler = HTMLbutton
            editor.appendChild(HTMLbutton)
        })


        window.switchColor = (color) => {
            
        }
        
        window.switch = (mode) => {
            buttons.forEach(button => {
               

                if(button.code === mode) {
                    button.handler.classList.add("active") 
                } else {
                    button.handler.classList.remove("active") 
                }
            })
            if(mode === EXPORT) {
                world_export()
            }
            if(mode === IMPORT) {
                world_import()
            }



            window.editor_mode = mode
           
        }

        window.cowSize.onkeyup = (e) => {
            this.world.createCowLevel(cowSize.value)
        }
    
        // flags
        this.isKeyConsumed = true
    }

    render() {}

    update(dt) {
        if(this.isKeyConsumed && this.world.over) {
            if(inputs.isUp()) {
                this.world.over.size(1)
                this.isKeyConsumed = false
            } else if(inputs.isDown()) {
                this.world.over.size(-1)
                this.isKeyConsumed = false
            }
        } else if(!inputs.isUp() && !inputs.isDown()) {
            this.isKeyConsumed = true
        }
    }
}