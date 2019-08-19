export class V3d {
    constructor(x = 0, y = 0, z = 0) {
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
        return new V3d(this.x, this.y, this.z)
    }

    length() {
        return Math.hypot(this.x, this.y, this.z)
    }
}
