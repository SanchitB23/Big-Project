import * as React from 'react';
import MonacoEditor, {EditorDidMount} from "@monaco-editor/react";
import {useRef} from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import './code-editor.css'
import codeShift from "jscodeshift";
import Highlighter from "monaco-jsx-highlighter";
import './syntax.css'

interface CodeEditorProps {
    initialValue: string;

    onChange(value: string): void
}

export const CodeEditor: React.FC<CodeEditorProps> = ({initialValue, onChange}) => {
    const monacoEditorRef = useRef<any>()

    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        monacoEditorRef.current = monacoEditor

        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue())
        })
        monacoEditor.getModel()?.updateOptions({tabSize: 2})

        const highlighter = new Highlighter(
            // @ts-ignore
            window.monaco,
            codeShift,
            monacoEditor
        )
        highlighter.highLightOnDidChangeModelContent(
            () => {
            },
            () => {
            },
            undefined,
            () => {
            }
        )
    }

    const onFormatClick = () => {
        const unFormatted = monacoEditorRef.current.getModel().getValue();

        const formatted = prettier.format(unFormatted,
            {
                parser: 'babel',
                plugins: [parser],
                useTabs: false,
                semi: true,
                singleQuote: true,
            }).replace(/\n$/, '')

        monacoEditorRef.current.setValue(formatted);
    }

    return (
        <div className="editor-wrapper">
            <button
                onClick={onFormatClick}
                className="button button-format is-primary is-small is-rounded"
            >
                Format
            </button>
            <MonacoEditor
                editorDidMount={onEditorDidMount}
                language="javascript"
                height="100%"
                theme="dark"
                options={{
                    wordWrap: 'on',
                    minimap: {enabled: false},
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false
                }}
                value={initialValue}
            />
        </div>
    )
};

