import {canvas_zero} from "../engine/canvas"

export const project = (pos, proj) => {
    proj.set(
        canvas_zero.x + (pos.x * window.CELL_W - pos.y * window.CELL_W),
        canvas_zero.y + (pos.x * window.CELL_H + pos.y * window.CELL_H),
    )

    return proj
}   

export const unProject = (pos, proj) => {
    proj.set(
        canvas_zero.x + (pos.x * window.CELL_W - pos.y * window.CELL_W),
        canvas_zero.y + (pos.x * window.CELL_H + pos.y * window.CELL_H),
    )

    return proj
}
