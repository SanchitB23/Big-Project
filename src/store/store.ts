import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";

export const store = createStore(reducers, {}, applyMiddleware(thunk))

/*
Manual Redux Testing
store.dispatch({
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
        id: null,
        type: CellType.CODE
    }
})

console.log(store.getState())
*/
