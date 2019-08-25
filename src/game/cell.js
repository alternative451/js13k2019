import { V3d } from "../lib/v3d";
import { colors, clearColor, darkColor } from "../engine/colors"
import { Fluid } from "./fluid";
import { Inputs } from "./inputs";
const TILE_SIZE = 30
const ALPHA = 37//°
const CELL_W = Math.sqrt(2) * TILE_SIZE
const CELL_H = CELL_W * Math.sin(ALPHA * Math.PI / 180) 

const origin = new V3d( window.innerWidth / 2, 0 )

export class Cell {
    constructor(x, y, z, isSource) {
        this.pos = new V3d(x, y, z)
        this.listenPath = new Path2D()
        this.proj = new V3d(
            origin.x + (this.pos.x * CELL_W - this.pos.y * CELL_W),
            origin.y + (this.pos.x * CELL_H + this.pos.y * CELL_H),
            )

        this.hfluids = 0
        this.futureFluids = 0
        this.isSource = isSource

        this.fluid = new Fluid()
        this.isSelected = false
        this.isOver = false
    }

    init(world) {
        this.world = world
        this.neighbors = this.buildNeighbors(this.world)
        this.ctx = world.context
    }

    render(ctx, cam) {
        let color = colors[1]

        if(this.isOver) {
            color = colors[0]
        }

        if(this.isSelected) {
            color = colors[2]
        }

      
        
        this.listenPath = new Path2D()//ctx.beginPath()
        this.listenPath.moveTo(this.proj.x + cam.x, this.proj.y - this.pos.z + cam.y)
        this.listenPath.lineTo(this.proj.x + cam.x + CELL_W, this.proj.y - this.pos.z + cam.y + CELL_H)
        this.listenPath.lineTo(this.proj.x + cam.x + CELL_W * 2, this.proj.y - this.pos.z + cam.y)
        this.listenPath.lineTo(this.proj.x + cam.x + CELL_W, this.proj.y - this.pos.z + cam.y - CELL_H)
        this.listenPath.closePath()
        ctx.fillStyle = color
        ctx.fill(this.listenPath)
        ctx.beginPath()
        ctx.moveTo(this.proj.x + cam.x, this.proj.y - this.pos.z + cam.y)
        ctx.lineTo(this.proj.x + cam.x, this.proj.y - this.pos.z + cam.y + TILE_SIZE)
        ctx.lineTo(this.proj.x + cam.x + CELL_W, this.proj.y - this.pos.z + cam.y + CELL_H + TILE_SIZE)
        ctx.lineTo(this.proj.x + cam.x + CELL_W, this.proj.y - this.pos.z + cam.y + CELL_H)
        ctx.closePath()
        ctx.fillStyle = darkColor(color)
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(this.proj.x + cam.x + CELL_W * 2, this.proj.y - this.pos.z + cam.y)
        ctx.lineTo(this.proj.x + cam.x + CELL_W * 2, this.proj.y - this.pos.z + cam.y + TILE_SIZE)
        ctx.lineTo(this.proj.x + cam.x + CELL_W, this.proj.y - this.pos.z + cam.y + CELL_H + TILE_SIZE)
        ctx.lineTo(this.proj.x + cam.x + CELL_W, this.proj.y - this.pos.z + cam.y + CELL_H)
        ctx.closePath()
        ctx.fillStyle = clearColor(color)
        ctx.fill()

        if(DEBUG.FLUID) {
            ctx.fillStyle = "#000"
            ctx.fillText(this.hfluids, this.proj.x + cam.x + CELL_W, this.proj.y - this.pos.z + cam.y + CELL_H / 2)
       
        }

        if(DEBUG.TILE) {
         
            ctx.fillStyle = "#000"
            ctx.fillText(this.pos, this.proj.x + cam.x + CELL_W, this.proj.y - this.pos.z + cam.y + CELL_H / 2)
       
        }
    }

    buildNeighbors (world) {
        const nIds = []
        // 8 voisins
        if(this.pos.y < world.dim.y) { //1 ligne
            if(this.pos.x === 0) {// coin CELL_Haut gauche
                nIds.push(
                    world.get(this.pos.x + 1, this.pos.y),
                    world.get(this.pos.x + 1, this.pos.y + 1),
                    world.get(this.pos.x, this.pos.y + 1)
                    )
            } else if(this.pos.x === world.dim.x) {// coin CELL_Haut droite 
                nIds.push(
                    world.get(this.pos.x + 1, this.pos.y),
                    world.get(this.pos.x + 1, this.pos.y + 1),
                    world.get(this.pos.x, this.pos.y + 1)
                    )
            } else { // le reste
                nIds.push(
                    world.get(this.pos.x - 1, this.pos.y),
                    world.get(this.pos.x + 1, this.pos.y),
                    world.get(this.pos.x - 1, this.pos.y + 1),
                    world.get(this.pos.x, this.pos.y + 1),
                    world.get(this.pos.x + 1, this.pos.y + 1)
                )
            }
        } else if(this.pos.y === world.dim.y) { // dern ligne
            if(this.pos.x === world.dim.x) { // coin bas gauche
                nIds.push(
                    world.get(this.pos.x, this.pos.y - 1),
                    world.get(this.pos.x + 1, this.pos.y - 1),
                    world.get(this.pos.x - 1, this.pos.y)
                )
            } else if(this.pos.y === world.dim.y) { // coin bas droite
                nIds.push(
                    world.get(this.pos.x - 1, this.pos.y - 1),
                    world.get(this.pos.x, this.pos.y - 1),
                    world.get(this.pos.x - 1, this.pos.y)
                )
            } else {//le reste
                nIds.push(
                    world.get(this.pos.x - 1, this.pos.y - 1),
                    world.get(this.pos.x, this.pos.y - 1),
                    world.get(this.pos.x + 1, this.pos.y - 1),
                    world.get(this.pos.x - 1, this.pos.y),
                    world.get(this.pos.x + 1, this.pos.y)
                )
            }
        } else if(this.pos.x === 0) {//1ere colone
            nIds.push(
                world.get(this.pos.x, this.pos.y - 1),
                world.get(this.pos.x + 1, this.pos.y - 1),
                world.get(this.pos.x + 1, this.pos.y),
                world.get(this.pos.x, this.pos.y + 1),                
                world.get(this.pos.x + 1, this.pos.y + 1)
            )            
        } else if(this.pos.x === world.dim.x) {//derniere colone
            nIds.push(
                world.get(this.pos.x - 1, this.pos.y - 1),
                world.get(this.pos.x, this.pos.y - 1),
                world.get(this.pos.x - 1, this.pos.y),
                world.get(this.pos.x - 1, this.pos.y + 1),
                world.get(this.pos.x, this.pos.y + 1),
            )
        } else { // le centre
            nIds.push(
                world.get(this.pos.x - 1, this.pos.y - 1),
                world.get(this.pos.x, this.pos.y - 1),
                world.get(this.pos.x + 1, this.pos.y - 1),

                world.get(this.pos.x - 1, this.pos.y),
                world.get(this.pos.x + 1, this.pos.y),

                world.get(this.pos.x - 1, this.pos.y + 1),
                world.get(this.pos.x, this.pos.y + 1),
                world.get(this.pos.x + 1, this.pos.y + 1)
            )
        }

        return nIds
    }

    update(dt) {
        const isPointInPath = this.ctx.isPointInPath(this.listenPath, inputs.mousePos.x, inputs.mousePos.y)
        this.isOver = isPointInPath  
        if(isPointInPath && inputs.isMouseDown) {
            this.world.selected = this
        }
        if(DEBUG.INPUTS) {
            debugInput.innerHTML = this.pos
        }
        if(this.world.selected === this) {
            this.isSelected = true
        } else {
            this.isSelected = false
        }
    }

    
}
