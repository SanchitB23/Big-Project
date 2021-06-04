import {Dispatch} from "redux";
import {Action} from "../../Interfaces/action";
import {ActionType} from "../../constants/action-type";
import bundle from "../../functions/bundler";

export const createBundle = (cellId: string, input: string) => {
    return async (dispatch: Dispatch<Action>) => {
        console.log("start")
        dispatch({
            type: ActionType.BUNDLE_START,
            payload: {
                cellId
            }
        })

        const result = await bundle(input)
        console.log("end")

        dispatch({
            type: ActionType.BUNDLE_COMPLETE,
            payload: {
                output: result,
                cellId: cellId
            }
        })
    }
}
