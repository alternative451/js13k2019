import { V3d } from "../../lib/v3d";
import { project } from "../../lib/isometric_helper";

export class Player {
  constructor(pos) {
    this.pos = new V3d(pos.x, pos.y)
    this.proj = new V3d()
  }

  render(ctx, cam) {
    this.proj(project(this.pos, this.proj))
    ctx.begingPath()
  } 
}