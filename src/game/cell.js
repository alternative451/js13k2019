import { V3d } from "../lib/v3d";

const CELL_W = 
const CELL_H = 

class Cell {
    constructor(x, y, z, isSource) {
        this.pos = new V3d(x, y, z)
        this.hfluids = 0
        this.isSource = isSource

        this.orders = new Orders()
    }

    init(world) {
        this.neighbors = this.buildNeighbors(world)
    }

    render(cam) {
        let color = colors[map[id]]
        if(fluids[id] === 100) {
            color = colors[3]
        }
        if(hoverCase && hoverCase === id) {
            color = "#00FF28"
        }
        ctx.beginPath()
        ctx.moveTo(this.pos.x + cam.x, this.pos.y - posZ + cam.y)
        ctx.lineTo(this.pos.x + cam.x + W, this.pos.y - posZ + cam.y + H)
        ctx.lineTo(this.pos.x + cam.x + W * 2, this.pos.y - posZ + cam.y)
        ctx.lineTo(this.pos.x + cam.x + W, this.pos.y - posZ + cam.y - H)
        ctx.closePath()
        ctx.fillStyle = color
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(this.pos.x + cam.x, this.pos.y - posZ + cam.y)
        ctx.lineTo(this.pos.x + cam.x, this.pos.y - posZ + cam.y + TILE_SIZE)
        ctx.lineTo(this.pos.x + cam.x + W, this.pos.y - posZ + cam.y + H + TILE_SIZE)
        ctx.lineTo(this.pos.x + cam.x + W, this.pos.y - posZ + cam.y + H)
        ctx.closePath()
        ctx.fillStyle = darkColor(color)
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(this.pos.x + cam.x + W * 2, this.pos.y - posZ + cam.y)
        ctx.lineTo(this.pos.x + cam.x + W * 2, this.pos.y - posZ + cam.y + TILE_SIZE)
        ctx.lineTo(this.pos.x + cam.x + W, this.pos.y - posZ + cam.y + H + TILE_SIZE)
        ctx.lineTo(this.pos.x + cam.x + W, this.pos.y - posZ + cam.y + H)
        ctx.closePath()
        ctx.fillStyle = clearColor(color)
        ctx.fill()
        if(DEBUG.TILE) {
         
            ctx.fillStyle = "#000"
            ctx.fillText(d, this.pos.x + cam.x + W, this.pos.y - posZ + cam.y + H / 2)
       
        }
    }

    buildNeighbors = (world) => {
        const nIds = []
        // 8 voisins
        if(i<mapW) { //1 ligne
            if(i === 0) {// coin haut gauche
                nIds.push(i + 1, i + mapW, i + mapW + 1)
            } else if(i === mapH * mapW - 1) {// coin haut droite 
                nIds.push(i - 1, i + mapW - 1, i + mapW)
            } else { // le reste
                nIds.push(i - 1,i + 1, i + mapW - 1, i + mapW, i + mapW + 1)
            }
        } else if(i > mapW * (mapH - 1)) { // dern ligne
            if(i === mapW * (mapH - 1)) { // coin bas gauche
                nIds.push(i - mapW, i - mapW + 1, i + 1)
            } else if(i === mapH * mapW - 1) { // coin bas droite
                nIds.push(i - mapW - 1, i - mapW, i - 1)
            } else {//le reste
                nIds.push(i - mapW - 1, i - mapW, i - mapW + 1, i - 1, i + 1)
            }
        } else if(i % mapW === 1) {//1ere colone
            nIds.push(i - mapW, i - mapW + 1, i + 1, i + mapW, i + mapW + 1)            
        } else if(i % mapW === 0) {//derniere colone
            nIds.push(i - mapW - 1, i - mapW, i - 1, i + mapW - 1, i + mapW + 1)
        } else { // le centre
            nIds.push(i - mapW - 1, i - mapW, i - mapW + 1, i - 1, i + 1, i + mapW - 1, i + mapW, i + mapW + 1)
        }

        return nIds.map(id => {
            return world[id]
        })
    }
}
