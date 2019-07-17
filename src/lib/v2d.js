export class V2d {
    constructor(x,y) {
        this.x = x
        this.y = y
    }

    add(v) {
        this.x += v.x
        this.y += v.y
        return this
    }

    clone() {
        return new V2d(this.x, this.y)
    }

    length() {
        return Math.hypot(this.x, this.y)
    }
}
