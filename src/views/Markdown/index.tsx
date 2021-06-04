import './md-editor.css'
import MDEditor from '@uiw/react-md-editor';
import React, {useEffect, useRef, useState} from 'react';
import {Cell} from "../../Interfaces/cell";
import {useActions} from "../../hooks";
import {Constants} from "../../constants";

interface TextToMdEditorProps {
    cell: Cell
}

const TextToMdEditor: React.FC<TextToMdEditorProps> = ({cell}) => {
    const [isEditing, setIsEditing] = useState(false)
    // const [value, setValue] = useState("# Header")
    const ref = useRef<HTMLDivElement | null>(null)
    const {updateCell} = useActions()

    useEffect(() => {

        const listener = (event: MouseEvent) => {
            if (ref.current && event.target && ref.current?.contains(event.target as Node))
                return
            else setIsEditing(false)
        }

        document.addEventListener('click', listener, {capture: true})

        return () => {
            document.removeEventListener('click', listener, {capture: true})
        }
    }, [])

    if (isEditing) return (
        <div className="text-editor" ref={ref}>
            <MDEditor value={cell.content} onChange={value1 => updateCell(cell.id, value1 || '')}/>
        </div>
    )

    return (
        <div className="text-editor card" onClick={() => {
            setIsEditing(true)
        }}>
            <div className="card-content">
                <MDEditor.Markdown source={cell.content || Constants.MARKDOWN_INITIAL_TEXT}/>
            </div>
        </div>
    );
};

export default TextToMdEditor;
