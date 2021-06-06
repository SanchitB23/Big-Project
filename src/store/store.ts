import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {persistMiddleware} from "./middlewares/persist-middleware";

export const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(persistMiddleware, thunk)))

