import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import {ActionType} from "../constants/action-type";
import {CellType} from "../constants/cell-types";
import {composeWithDevTools} from "redux-devtools-extension";

export const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunk)))

// Manual Redux Testing
store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: CellType.CODE
    }
})
store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: CellType.MARKDOWN
    }
})
store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: CellType.CODE
    }
})

console.log(store.getState())
