import {Render} from "../engine/render"
import { V3d } from "../lib/v3d";

export class ClFrame {
   constructor(context,canvas) {
      this.renderer = new Render(context, canvas)
      this.cells = []
   }

   load(levelData) {
      for(levelData)
      this.cells.init()
   }

   draw(cam) {
      let d = 0
        for(let i = 0; i <= mapH + mapW; i ++) {
            for(let y = Math.max(0, i - mapH + 1); y <= Math.min(i, mapW - 1); y ++) {
                const x = i - y
                const tilePos = proj(x, y)
               
                const mindex = x + y * mapH
                for(let j = 0; j < elevations[mindex]; j ++) {
                  this.cells.render()
                }                        
            }
        }
   }

   update(dt) {
      
   }



}
