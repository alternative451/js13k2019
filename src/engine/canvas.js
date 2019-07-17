export class Canvas {
    constructor() {
        this.element = document.createElement('canvas')
        document.body.appendChild(this.element)
        
    }

    get2DContext() {
        return this.element.getContext('2d')
    }

    clean() {
        this.element.width += 0
    }
}
