import {ActionType} from "../constants/action-type";
import {CellTypes, CellDirections} from "../constants/cell-types";

export interface MoveCellAction {
    type: ActionType.MOVE_CELL;
    payload: {
        id: string,
        direction: CellDirections
    }
}

export interface DeleteCellAction {
    type: ActionType.DELETE_CELL
    payload: string
}

export interface InsertCellAfterAction {
    type: ActionType.INSERT_CELL_AFTER
    payload: {
        id: string | null,
        type: CellTypes
    }
}

export interface UpdateCellAction {
    type: ActionType.UPDATE_CELL
    payload: {
        id: string,
        content: string
    }
}

export interface BundleStartAction {
    type: ActionType.BUNDLE_START,
    payload: {
        cellId: string
    }
}

export interface BundleCompleteAction {
    type: ActionType.BUNDLE_COMPLETE,
    payload: {
        cellId: string,
        output: {
            code: string,
            err: string
        }
    }
}

export type Action =
    MoveCellAction |
    DeleteCellAction |
    InsertCellAfterAction |
    UpdateCellAction |
    BundleStartAction |
    BundleCompleteAction

