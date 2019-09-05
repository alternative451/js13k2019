import { Player } from "./agents/quote_player";

export class Entities {
  constructor() {
    this.agents = []
  }

  addPlayer(cell) {
    this.agents.push(new Player(cell.pos))
  }

  render(ctx, cam) {
    this.agents.forEach(agent => {
      agent.render(ctx, cam)
    })
  }

  update(dt, world) {
    this.agents.forEach(agent => {
      agent.update(dt, world)
    })
  }
}