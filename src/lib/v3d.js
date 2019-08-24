export class V3d {
    constructor(x,y,z) {
        this.x = x
        this.y = y
        this.z = z
    }

    set(x,y,z) {
        this.x = x
        this.y = y
        this.z = z
    }

    add(v) {
        this.x += v.x
        this.y += v.y
        this.z += v.z
        return this
    }

    clone() {
        return new V2d(this.x, this.y, this.z)
    }

    length() {
        return Math.hypot(this.x, this.y, this.z)
    }
}
