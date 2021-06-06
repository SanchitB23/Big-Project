import {
    Action,
    DeleteCellAction,
    InsertCellAfterAction,
    MoveCellAction,
    UpdateCellAction
} from "../../Interfaces/action";
import {ActionType} from "../../constants/action-type";
import {CellDirections, CellTypes} from "../../constants/cell-types";
import {Dispatch} from "redux";
import axios from "axios";
import {Cell} from "../../Interfaces/cell";
import {RootState} from "../reducers";

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

export const fetchCells = () => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({type: ActionType.FETCH_CELLS})

        try {
            const {data}: { data: Cell[] } = await axios.get('/cells')
            dispatch({
                type: ActionType.FETCH_CELLS_COMPLETE,
                payload: data
            })
        } catch (e) {
            dispatch({
                type: ActionType.FETCH_CELLS_ERROR,
                payload: e.message
            })
        }
    }
}

export const saveCells = () => {
    return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
        const {cells} = getState()

        const data = cells?.order.map(id => cells.data[id])

        try {
            console.log("Going to save")
            await axios.post('/cells', {data})
            console.log("saved")
        } catch (e) {
            console.log("not saved")
            dispatch({
                type: ActionType.SAVE_CELLS_ERROR,
                payload: e.message
            })
        }

    }
}
