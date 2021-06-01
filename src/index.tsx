import ReactDOM from "react-dom";
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import TextEditor from "./components/text-editor";
import CodeCell from "./components/code-cell";
import {Provider} from "react-redux";
import {store} from "./store";

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <CodeCell/>
                <TextEditor/>
            </div>
        </Provider>
    )
}

ReactDOM.render(<App/>, document.querySelector("#root"))
