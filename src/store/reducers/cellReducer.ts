import {Cell} from "../../Interfaces/cell";
import {Action} from "../../Interfaces/action";
import {ActionType} from "../../constants/action-type";
import produce from "immer";
import {CellDirection} from "../../constants/cell-types";
import createRandomID from "../../helpers/createRandomID";

interface CellsState {
    loading: boolean,
    error: string | null,
    order: string[],
    data: {
        [key: string]: Cell
    }
}

const initialState: CellsState = {
    data: {}, error: null, loading: false, order: []
}

const reducer = produce((state: CellsState = initialState, action: Action): CellsState | void => {
    switch (action.type) {
        case ActionType.FETCH_CELLS:
            state.loading = true;
            state.error = null
            return state

        case ActionType.FETCH_CELLS_COMPLETE:
            state.order = action.payload.map((cell) => cell.id)
            state.data = action.payload.reduce((acc, cell) => {
                acc[cell.id] = cell
                return acc
            }, {} as CellsState['data'])
            return state

        case ActionType.FETCH_CELLS_ERROR:
            state.loading = false;
            state.error = action.payload
            return state
        case ActionType.SAVE_CELLS_ERROR:
            state.error = action.payload
            return state

        case ActionType.DELETE_CELL:
            delete state.data[action.payload]
            state.order = state.order.filter((id) => id !== action.payload)
            return state

        case ActionType.INSERT_CELL_AFTER:
            const cell: Cell = {content: "", id: createRandomID(), type: action.payload.type}

            state.data[cell.id] = cell
            const foundIndex = state.order.findIndex((id) => id === action.payload.id)

            if (foundIndex < 0) state.order.unshift(cell.id)
            else state.order.splice(foundIndex + 1, 0, cell.id)
            return state

        case ActionType.MOVE_CELL:
            const index = state.order.findIndex((id) => {
                return id === action.payload.id
            })
            const targetIndex = action.payload.direction === CellDirection.UP ? index - 1 : index + 1
            if (targetIndex < 0 || targetIndex > state.order.length - 1) return state
            state.order[index] = state.order[targetIndex]
            state.order[targetIndex] = action.payload.id
            return state

        case ActionType.UPDATE_CELL:
            const {id, content} = action.payload
            state.data[id].content = content
            return state

        default :
            return state
    }
})

export default reducer
