import {Render} from "./render"

export class ClFrame {
   constructor(gl,canvas) {
      this.renderer = new Render(gl, canvas)
      renderer.init(gl)
   }
   draw() {
      this.renderer.pepare_frame()


      this.renderer.end_frame()
   }

}
