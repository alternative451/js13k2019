import { V3d } from "../lib/v3d";
import { Cell } from "./cell"
import {Entities} from "./entities"
import {IS_NO_GPS, IS_NO_ACTION, IS_EXIT, IS_START, IS_ORDER_SOURCE} from "./editor"

import l1 from "../levels/world1"

export class ClFrame {
   constructor(context, cam) {
      this.shouldRender = false
      this.cells = []
      this.dim = new V3d()
      this.context = context
      this.cam = cam

      this.selected = null
      window.world_export = () => this.export()
      window.world_import = () => this.import()

      this.entities = new Entities()
   }

   get(x, y) {
      return this.cells[ x + y * this.dim.x] 
   }

   getIncludingCell(pos) {
      const c = this.cells[Math.floor(pos.x) + Math.floor(pos.y) * this.dim.x]
      if(DEBUG.DANCING_CELL) {
         c.isNoGPS = true
      }
   }

   load(levelData) {
      this.shouldRender = false
      this.dim.set(levelData.width, levelData.height)

      this.cells = levelData.data.map((cellData, i) => {
          const cell = new Cell(i % this.dim.x, Math.floor(i / this.dim.x), cellData.h)
          cell.isSource = cellData.d[0]
          cell.isStart = cellData.d[1]
         if (cell.isStart) {
            this.entities.addPlayer(cell)
         }
          cell.isExit = cellData.d[2]
          cell.isNoAction = cellData.d[3]
          cell.isNoGPS = cellData.d[4]
          return cell
      })

      this.cells.forEach((cell) => {
         cell.init(this)
      })
      this.shouldRender = true
   }

   export() {
      console.log(JSON.stringify({data:this.cells.map(cell => {
         return {h: cell.height, d:[cell.isSource, cell.isStart, cell.isExit, cell.isNoAction, cell.isNoGPS]}
      }),
      width: this.dim.x,
      height: this.dim.y
   }))
   }

   import() {
      this.load(l1) 
   }

   createCowLevel(dimString) {
      this.shouldRender = false
      const dim = parseInt(dimString, 10)
      this.dim.set(dim,dim)
      this.cells = []
      for(let i = 0; i < dim * dim; i ++) {this.cells.push(new Cell(i % this.dim.x, Math.floor(i / this.dim.x), 0, 0))}
      this.cells.forEach((cell) => {
         cell.init(this)
      })
      this.shouldRender = true
   }


   render() {
      if(this.shouldRender) {
        for(let i = 0; i <= this.dim.y + this.dim.x; i ++) {
            for(let y = Math.max(0, i - this.dim.x + 1); y <= Math.min(i, this.dim.y - 1); y ++) {
               const x = i - y
               this.get(x,y).render(this.context,this.cam)             
            }
        }
        this.entities.render(this.context, this.cam)
      }
   }

   update(dt) {
      if(inputs.isMouseDown) {
         this.selected = null
      }
      this.cells.forEach(cell => {
         cell.update(dt)
      })

      this.cells.forEach(cell => {
         cell.hfluids = cell.futureFluids
      })

      


      if(this.selected) {
         this.selected.isSource = false
         this.selected.isNoGPS = false
         this.selected.isNoAction = false
         this.selected.isExit = false
         this.selected.isStart = false

         switch(window.editor_mode) {

               case IS_ORDER_SOURCE: 
                  this.selected.isSource = true
                  break
               case IS_NO_GPS:
                  this.selected.isNoGPS = true
                  break
               case IS_NO_ACTION:
                  this.selected.isNoAction = true
                  break
               case IS_EXIT:
                  this.selected.isExit = true
                  break
               case IS_START:
                  this.selected.isStart = true
                  break
                  default:
                     return
            }
         }
      this.entities.update(dt, this)
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
