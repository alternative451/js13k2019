import { V3d } from "../lib/v3d";
import { colors, clearColor, darkColor, LightenDarkenColor, color_palette } from "../engine/colors"
import { Fluid } from "./fluid";
import {clamp} from '../lib/utils'
import { project } from "../lib/isometric_helper"

const TILE_SIZE = 30
const ALPHA = 37//°

window.CELL_W = Math.sqrt(2) * TILE_SIZE
window.CELL_H = CELL_W * Math.sin(ALPHA * Math.PI / 180) 

export class Cell {
    constructor(x, y, h) {
        this.pos = new V3d(x, y, 0)
        this.height = h
        this.listenPath = new Path2D()
        this.proj = new V3d()
        project(this.pos, this.proj)

        this.hfluids = 0
        this.futureFluids = 0
        // STATE
        this.isSource = false
        this.isStart = false
        this.isExit = false
        this.isNoAction = false
        this.isNoGPS = false
        
        this.fluid = new Fluid()

        // ED STATE
        this.isSelected = false
        this.isOver = false
    }

    init(world) {
        this.world = world
        this.neighbors = this.buildNeighbors(this.world)
        this.ctx = world.context
    }

    render(ctx, cam) {
        let color = color_palette[7]
        if(this.isOver) color = colors[0]
        if(this.isSelected) color = colors[2]
        
        if(this.isExit) color = color_palette[0]
        if(this.isNoAction) color = color_palette[1]
        if(this.isNoGPS) color = color_palette[2]
        if(this.isSource) color = color_palette[1]
        if(this.isStart) color = color_palette[4]




        color = LightenDarkenColor(color, -this.height * 10)
      
        
        this.listenPath = new Path2D()//ctx.beginPath()
        this.listenPath.moveTo(this.proj.x + cam.x, this.proj.y - this.pos.z + cam.y - this.height * CELL_H)
        this.listenPath.lineTo(this.proj.x + cam.x + CELL_W, this.proj.y - this.pos.z + cam.y + CELL_H - this.height * CELL_H)
        this.listenPath.lineTo(this.proj.x + cam.x + CELL_W * 2, this.proj.y - this.pos.z + cam.y - this.height * CELL_H)
        this.listenPath.lineTo(this.proj.x + cam.x + CELL_W, this.proj.y - this.pos.z + cam.y - CELL_H - this.height * CELL_H)
        this.listenPath.closePath()
        
        ctx.fillStyle = color
        ctx.fill(this.listenPath)
        ctx.beginPath()
        ctx.moveTo(this.proj.x + cam.x, this.proj.y - this.pos.z + cam.y - this.height * CELL_H)
        ctx.lineTo(this.proj.x + cam.x, this.proj.y - this.pos.z + cam.y + TILE_SIZE)
        ctx.lineTo(this.proj.x + cam.x + CELL_W, this.proj.y - this.pos.z + cam.y + CELL_H + TILE_SIZE)
        ctx.lineTo(this.proj.x + cam.x + CELL_W, this.proj.y - this.pos.z + cam.y + CELL_H - this.height * CELL_H)
        ctx.closePath()
        ctx.fillStyle = darkColor(color)
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(this.proj.x + cam.x + CELL_W * 2, this.proj.y - this.pos.z + cam.y - this.height * CELL_H)
        ctx.lineTo(this.proj.x + cam.x + CELL_W * 2, this.proj.y - this.pos.z + cam.y + TILE_SIZE)
        ctx.lineTo(this.proj.x + cam.x + CELL_W, this.proj.y - this.pos.z + cam.y + CELL_H + TILE_SIZE)
        ctx.lineTo(this.proj.x + cam.x + CELL_W, this.proj.y - this.pos.z + cam.y + CELL_H - this.height * CELL_H)
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
        if(this.pos.y === 0) { //1 ligne
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

    size(amount) {
        this.height = clamp(this.height += amount, 0, 10)

        if(DEBUG.EDITOR) {
            debugInput.innerHTML = this.height
        }
    }

    update(dt) {

        if(window.gameState === window.gameStates.MENU) { //TODO set editor
            const isPointInPath = this.ctx.isPointInPath(this.listenPath, inputs.mousePos.x, inputs.mousePos.y)
          
            if(isPointInPath && inputs.isMouseDown) {
                this.world.selected = this
            } else if(isPointInPath) {
                this.world.over = this
            }
    
            this.isOver = this.world.over === this
            this.isSelected = this.world.selected === this
        //} else if(window.gameState === window.gameStates.MENU) {//TODO set play
            if(this.isSource) {
                this.neighbors.forEach(neighbor => {
                    neighbor.futureFluids += 1
                })
            }
        }
        

    }    
}
