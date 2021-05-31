import {useEffect, useState} from "react";
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import bundler from "../bundler";
import {CodeEditor} from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";

const CodeCell = () => {
    const [input, setInput] = useState('')
    const [code, setCode] = useState('')

    useEffect(() => {
        let timer: NodeJS.Timer

        timer = setTimeout(async () => {
            const output = await bundler(input)
            setCode(output)
        }, 1000)

        return () => clearTimeout(timer)

    }, [input])

    return (
        <Resizable direction="vertical">
            <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
                <Resizable
                    direction="horizontal"
                >
                    <CodeEditor initialValue="// Type Your JS Code Here" onChange={(value) => {
                        setInput(value)
                    }}/>
                </Resizable>
                <Preview code={code}/>
            </div>
        </Resizable>
    )
}

export default CodeCell
