import { V3d } from "../../lib/v3d";
import { project } from "../../lib/isometric_helper";


// interface applyable
export class Player {
  constructor(pos) {
    this.pos = new V3d(pos.x, pos.y)
    this.proj = new V3d()
    
    this.cell = null
  }

  render(ctx, cam) {
    project(this.pos, this.proj)
    ctx.beginPath()
    ctx.lineTo(this.proj.x + cam.x, this.proj.y + cam.y)
    ctx.lineTo(this.proj.x + cam.x + 30, this.proj.y + cam.y + 30)
    ctx.lineTo(this.proj.x + cam.x + 60, this.proj.y + cam.y)
    ctx.lineTo(this.proj.x + cam.x, this.proj.y + cam.y)
    ctx.fillStyle = "#ff0"
    ctx.fill()
  } 

  update(dt, world) {
    this.pos.x += .01
    this.pos.y += .02
    this.cell = world.getIncludingCell(this.pos)
    if(cell) {
      cell.order.burn(this) //DO MAGICK HERE
    }
  }

  apply(queue) {
    
  }
}