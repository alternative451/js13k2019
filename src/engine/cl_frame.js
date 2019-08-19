import {Render} from "./render"
import { V3d } from "../lib/v3d";

export class ClFrame {
   constructor(gl,canvas) {
      this.renderer = new Render(gl, canvas)
      this.renderer.init(gl)
   }
   draw(cam) {
      this.renderer.prepare_frame()

//      push_quad(x, 0, z, x + 8, 0, z, x, 0, z + 8, x + 8, 0, z + 8, 0,1,0, tile);
      for(let i = 0; i < 10; i ++) {
         for(let j = 0; j < 10; j++) {
            let p1 = new V3d(i, 0, j)
            let p2 = new V3d(i+8, 0, j)
            let p3 = new V3d()
            this.renderer.push_quad(p1, p2, p3, 1)
            
         }
      }


      this.renderer.end_frame(cam)
   }
}
