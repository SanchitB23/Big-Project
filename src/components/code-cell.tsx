import {useState} from "react";
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import bundler from "../bundler";
import {CodeEditor} from "./code-editor";
import Preview from "./preview";

const CodeCell = () => {
    const [input, setInput] = useState('')
    const [code, setCode] = useState('')

    const onClick = async () => {
        const output = await bundler(input)
        setCode(output)
    }

    return (
        <div>
            <CodeEditor initialValue="// Type Your Code Here" onChange={(value) => {
                setInput(value)
            }}/>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <Preview code={code}/>
        </div>
    )
}

export default CodeCell
