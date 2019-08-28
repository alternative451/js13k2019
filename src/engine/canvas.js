export class Canvas {
    constructor(isBlend) {
        this.element = document.createElement('canvas')
        document.body.appendChild(this.element)

        this.element.width = window.innerWidth
        this.element.height = window.innerHeight

        if(isBlend) {
            this.elementgl = document.createElement('canvas')
            document.body.appendChild(this.elementgl)
        }
    }

    getContext() {
        return this.element.getContext('2d')
    }
}
