export const ORDER_TOP_LEFT = 1 
export const ORDER_TOP_RIGHT = 2 
export const ORDER_BOTTOM_LEFT = 3 
export const ORDER_BOTTOM_RIGHT = 4 

export class Orders {
  constructor(cell) {
    this.queue = []
    this.cell = cell
  }

  addOrder(orderCode) {
    this.queue.push(orderCode)
  }

  burn(agent) {
    agent.apply(this.queue)
    this.queue = []
  }


  render(ctx, cam) {
    ctx.fillText(this.queue.length, this.cell.proj.x + cam.x, this.cell.proj.y + cam.y)
  }
}