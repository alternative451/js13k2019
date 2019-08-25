import { V3d } from "../lib/v3d";
import { Cell } from "./cell"

export class ClFrame {
   constructor(context, cam) {
      this.cells = []
      this.dim = new V3d()
      this.context = context
      this.cam = cam

      this.selected = null
   }

   get(x, y) {
      return this.cells[ x + y * this.dim.x] 
   }

   load(levelData) {
      this.dim.set(levelData.width, levelData.height)

      this.cells = levelData.data.map((cellData, i) => {
         return new Cell(i % this.dim.x, Math.floor(i / this.dim.x), 0, cellData === 1)
      })
      this.cells.forEach((cell) => {
         cell.init(this)
      })

      console.log(this.dim)
   }


   render() {
        for(let i = 0; i <= this.dim.y + this.dim.x; i ++) {
            for(let y = Math.max(0, i - this.dim.x + 1); y <= Math.min(i, this.dim.y - 1); y ++) {
               const x = i - y
               this.get(x,y).render(this.context,this.cam)             
            }
        }
   }

   update(dt) {
      this.cells.forEach(cell => {
         cell.update(dt)
      })
      /*
      for(let i  = 0; i < this.cells.length; i++) {
         if(i === SOURCE_IDS[0]) {
             nextStepFluids[i] = zeroCentClamp(fluids[i] + FLUID_GROWTH)
         }
         if(fluids[i] >= FLUID_LIMIT) {
             const neighborsIds = getNeighbors(i)
             neighborsIds.forEach(id => {
                 nextStepFluids[id] = zeroCentClamp( fluids[id] + FLUID_GROWTH / neighborsIds.length )
             })
         } else {
             nextStepFluids[i] = fluids[i]
         }
     }
     fluids = nextStepFluids
   }*/
}



}
