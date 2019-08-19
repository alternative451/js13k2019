export class Canvas {
    constructor() {
        this.element = document.createElement('canvas')
        document.body.appendChild(this.element)

        this.element.width = window.innerWidth
        this.element.height = window.innerHeight
    }

    getContext() {
        return this.element.getContext('2d')
    }
}
