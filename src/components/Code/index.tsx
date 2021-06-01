import {useEffect, useState} from "react";
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import bundler from "../../functions/bundler";
import {CodeEditor} from "./CodeEditor/code-editor";
import CodePreview from "./CodePreview/code-preview";
import Resizable from "../../container/resizable";

const Code = () => {
    const [input, setInput] = useState('')
    const [code, setCode] = useState('')
    const [err, setErr] = useState('')
    useEffect(() => {
        let timer: NodeJS.Timer

        timer = setTimeout(async () => {
            const output = await bundler(input)
            setCode(output.code)
            setErr(output.err)
        }, 1000)

        return () => clearTimeout(timer)

    }, [input])

    return (
        <Resizable direction="vertical">
            <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
                <Resizable
                    direction="horizontal"
                >
                    <CodeEditor initialValue="// Type Your JS Index Here" onChange={(value) => {
                        setInput(value)
                    }}/>
                </Resizable>
                <CodePreview code={code} error={err}/>
            </div>
        </Resizable>
    )
}

export default Code
