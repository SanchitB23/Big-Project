import produce from "immer";
import {Action} from "../../Interfaces/action";
import {ActionType} from "../../constants/action-type";

interface BundleState {
    [key: string]: {
        isProcessing: boolean,
        code: string,
        err: string
    } | undefined
}

const initialState: BundleState = {}

const bundleReducer = produce((state: BundleState = initialState, action: Action): BundleState => {

    switch (action.type) {
        case ActionType.BUNDLE_START:
            state[action.payload.cellId] = {
                isProcessing: true,
                code: '',
                err: ''
            }
            return state
        case ActionType.BUNDLE_COMPLETE:
            state[action.payload.cellId] = {
                isProcessing: false,
                code: action.payload.output.code,
                err: action.payload.output.err,
            }
            return state
        default :
            return state
    }
})
export default bundleReducer
