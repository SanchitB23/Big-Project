import React, {useEffect} from "react";
import {CodeEditor} from "./CodeEditor/code-editor";
import Resizable from "../../container/resizable";
import {Cell} from "../../Interfaces/cell";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/use-typed-selector";
import CodePreview from "./CodePreview/code-preview";
import './code-cell.css'

interface CodeCellProps {
    cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {

    const {updateCell, createBundle} = useActions()
    const bundle = useTypedSelector((state) => state.bundles![cell.id])

    useEffect(() => {
        if (!bundle) {
            createBundle(cell.id, cell.content)
            return
        }
        const timer = setTimeout(async () => {
            createBundle(cell.id, cell.content)
        }, 1000)

        return () => clearTimeout(timer)

        // eslint-disable-next-line
    }, [cell.content, cell.id, createBundle])

    console.log("Check", bundle)
    return (
        <Resizable direction="vertical">
            <div style={{height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
                <Resizable direction="horizontal">
                    <CodeEditor
                        initialValue="// Type Your JS Index Here"
                        onChange={(value) => updateCell(cell.id, value)}
                    />
                </Resizable>
                <div className="progress-wrapper">
                    {
                        !bundle || bundle.isProcessing
                            ? (
                                <div className="progress-cover">
                                    <progress className="progress is-small is-primary" max="100">
                                        Loading
                                    </progress>
                                </div>
                            )
                            : <CodePreview code={bundle.code} error={bundle.err}/>
                    }
                </div>
            </div>
        </Resizable>
    )
}

export default CodeCell
