import { Player } from "./agents/quote_player";

export class Entities {
  constructor() {
    this.agents = []
  }

  addPlayer(cell) {
    this.agents.push(new Player(this.cell.pos))
  }

  render(ctx, cam) {
    this.agents.forEach(agent => {
      agent.render(ctx, cam)
    })
  }

  update(dt) {
    this.agents.forEach(agent => {
      agent.update(dt)
    })
  }
}