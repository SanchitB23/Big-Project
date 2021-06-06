import {Dispatch} from "redux";
import {Action} from "../../Interfaces/action";
import {ActionType} from "../../constants/action-type";
import {RootState} from "../reducers";
import {saveCells} from "../actions";

export const persistMiddleware = ({dispatch, getState}: { dispatch: Dispatch<Action>, getState: () => RootState }) => {
    let timer: NodeJS.Timer

    return (next: (action: Action) => void) => {
        return (action: Action) => {
            next(action)
            if ([ActionType.MOVE_CELL, ActionType.DELETE_CELL, ActionType.INSERT_CELL_AFTER, ActionType.UPDATE_CELL].includes(action.type)) {
                if (timer) clearTimeout(timer)
                timer = setTimeout(() => {
                    saveCells()(dispatch, getState)
                }, 250)
            }
        }
    }
}
