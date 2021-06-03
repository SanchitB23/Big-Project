import React, {useEffect, useState} from "react";
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import bundler from "../../functions/bundler";
import {CodeEditor} from "./CodeEditor/code-editor";
import CodePreview from "./CodePreview/code-preview";
import Resizable from "../../container/resizable";
import {Cell} from "../../Interfaces/cell";
import {useActions} from "../../hooks/useActions";

interface CodeCellProps {
    cell: Cell
}

const Code: React.FC<CodeCellProps> = ({cell}) => {
    // const [input, setInput] = useState('')
    const [code, setCode] = useState('')
    const [err, setErr] = useState('')
    const {id, content} = cell

    const {updateCell} = useActions()

    useEffect(() => {
        let timer: NodeJS.Timer

        timer = setTimeout(async () => {
            const output = await bundler(content)
            setCode(output.code)
            setErr(output.err)
        }, 1000)

        return () => clearTimeout(timer)

    }, [content])

    return (
        <Resizable direction="vertical">
            <div style={{height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
                <Resizable direction="horizontal">
                    <CodeEditor
                        initialValue="// Type Your JS Index Here"
                        onChange={(value) => updateCell(id, value)}
                    />
                </Resizable>
                <CodePreview code={code} error={err}/>
            </div>
        </Resizable>
    )
}

export default Code
