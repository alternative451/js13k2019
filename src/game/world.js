import { V3d } from "../lib/v3d";

export class ClFrame {
   constructor(context,canvas) {
      this.cells = []
      this.worldX = 0
      this.worldY = 0
   }

   load(levelData) {
      this.worldX = levelData.width
      this.worldY = levelData.height

      this.cells = levelData.data.map((cellData, i) => {
         let cell = new cell(i % levelData.width, i / levelData, 0, cellData === 1)
         this.cells.push(cell)
      })
      this.cells.forEach((cell) => {
         cell.init(this)
      })
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
