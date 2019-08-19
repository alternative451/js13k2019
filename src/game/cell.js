import { V3d } from "../lib/v3d";

class Cell {
    constructor() {
        this.pos = new V3d(0,0,0)
        this.hfluids = 0
        this.isSource = false

        this.orders = new Orders()
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
        ctx.moveTo(posX + camOffsetX, posY - posZ + camOffsetY)
        ctx.lineTo(posX + camOffsetX + W, posY - posZ + camOffsetY + H)
        ctx.lineTo(posX + camOffsetX + W * 2, posY - posZ + camOffsetY)
        ctx.lineTo(posX + camOffsetX + W, posY - posZ + camOffsetY - H)
        ctx.closePath()
        ctx.fillStyle = color
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(posX + camOffsetX, posY - posZ + camOffsetY)
        ctx.lineTo(posX + camOffsetX, posY - posZ + camOffsetY + TILE_SIZE)
        ctx.lineTo(posX + camOffsetX + W, posY - posZ + camOffsetY + H + TILE_SIZE)
        ctx.lineTo(posX + camOffsetX + W, posY - posZ + camOffsetY + H)
        ctx.closePath()
        ctx.fillStyle = darkColor(color)
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(posX + camOffsetX + W * 2, posY - posZ + camOffsetY)
        ctx.lineTo(posX + camOffsetX + W * 2, posY - posZ + camOffsetY + TILE_SIZE)
        ctx.lineTo(posX + camOffsetX + W, posY - posZ + camOffsetY + H + TILE_SIZE)
        ctx.lineTo(posX + camOffsetX + W, posY - posZ + camOffsetY + H)
        ctx.closePath()
        ctx.fillStyle = clearColor(color)
        ctx.fill()
        if(DEBUG.TILE) {
         
            ctx.fillStyle = "#000"
            ctx.fillText(d, posX + camOffsetX + W, posY - posZ + camOffsetY + H / 2)
       
        }
    }

    buildNeighbors = () => {
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
        return nIds
    }
}
