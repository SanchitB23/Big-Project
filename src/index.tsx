import ReactDOM from "react-dom";
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import {Provider} from "react-redux";
import {store} from "./store";
import CellList from "./components/Cells/cell-list";

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <CellList/>
            </div>
        </Provider>
    )
}

ReactDOM.render(<App/>, document.querySelector("#root"))
