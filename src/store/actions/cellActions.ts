import {DeleteCellAction, InsertCellAfterAction, MoveCellAction, UpdateCellAction} from "../../Interfaces/action";
import {ActionType} from "../../constants/action-type";
import {CellDirections, CellTypes} from "../../constants/cell-types";

export const updateCell = (id: string, content: string): UpdateCellAction => {
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            id, content
        }
    }
}

export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: ActionType.DELETE_CELL,
        payload: id
    }
}

export const moveCell = (id: string, direction: CellDirections): MoveCellAction => {
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            id,
            direction
        }
    }
}

export const insertCellAfter = (id: string | null, cellTypes: CellTypes): InsertCellAfterAction => {
    return {
        type: ActionType.INSERT_CELL_AFTER,
        payload: {
            id,
            type: cellTypes
        }
    }
}

