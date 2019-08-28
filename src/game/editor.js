const IS_SOURCE = 0
const IS_NO_GPS = 1
const IS_NO_ACTION = 2
const IS_EXIT = 3
const IS_START = 4
const IS_ORDER_SOURCE = 5

const buttons = [
    {
        code : IS_ORDER_SOURCE, color: "#123123", icon: "💦",
    }, {
        code : IS_NO_GPS, color: "#123123", icon: "️clound",
    }, {
        code : IS_NO_ACTION, color: "#123123", icon: "no action",
    }, {
        code : IS_EXIT, color: "#123123", icon: "exit",
    }, {
        code : IS_START, color: "#123123", icon: "start",
    }
]

export class Editor {
    constructor(world) {
        this.world = world
        // UI

        buttons.forEach((button) => {
            const HTMLbutton = document.createElement("button")
            HTMLbutton.innerText = button.icon
            HTMLbutton.onclick = () => window.switch(button.code)

            editor.appendChild(HTMLbutton)
        })

        this.current == window.SOURCE

        window.switchColor = (color) => {
            
        }
        
        window.switch = (mode) => {
            this.current = mode
            if(this.world.selected) {
                switch(this.current) {
                    case IS_SOURCE: 
                        this.world.selected.isSource = !this.world.selected.isSource 
                    case IS_NO_GPS:
                        this.world.selected.isNoGPS = !this.world.selected.isNoGPS 
                    case IS_NO_ACTION:
                        this.world.selected.isNoAction = !this.world.selected.isNoAction
                    case IS_EXIT:
                        this.world.selected.isExit = !this.world.selected.isExit
                    case IS_START:
                        this.world.selected.isStart = !this.world.selected.isStart
                }
            }
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