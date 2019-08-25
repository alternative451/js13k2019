window.ELEVATION = 1
window.SOURCE = 2


export class Editor {
    constructor(world) {
        this.world = world
        // UI
        this.current = window.ELEVATION
        window.switch = (mode) => {
            this.current = mode
        }
    
        // flags
        this.isKeyConsumed = true
    }

    render() {}

    update(dt) {
        inputs.keys
    }
}