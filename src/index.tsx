import ReactDOM from "react-dom";
import {useEffect, useRef, useState} from "react";
import {unpkgPathPlugin} from "./plugins/unpkg-path-plugin";
import * as esbuild from "esbuild-wasm";
import {fetchPlugin} from "./plugins/fetch-plugin";


const App = () => {
    const ref = useRef<any>()
    const iframe = useRef<any>()

    const [input, setInput] = useState('')

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        })
    }
    useEffect(() => {
        startService().then(() => console.log("Service Started"))
    }, [])

    const onClick = async () => {
        if (!ref.current) return

        /*
                const result = await ref.current.transform(input, {
                    loader: 'jsx',
                    target: 'es2015'
                })
        */

        iframe.current.srcdoc = html;

        /*added plugin to handle import files*/
        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [
                unpkgPathPlugin(),
                fetchPlugin(input)
            ],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window'
            }

        })

        iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*")

    }

    const html = `
        <html lang="en">
            <head>
                <title>Test Sub HTML</title>
            </head>
            <body>
                <div id="root"></div>
                <script>
                    window.addEventListener('message',(event) => {
                        try {
                          eval(event.data);
                        } catch (e) {
                          const root = document.querySelector('#root');
                          root.innerHTML = '<div style="color:red;">'+ e +'</div>'
                          console.error("Inner Code Error "+e)
                        }
                    },false)
                </script>
            </body>
        </html>     
    `

    return (
        <div>
            <textarea value={input} onChange={event => {
                setInput(event.target.value)
            }}/>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <iframe ref={iframe} srcDoc={html} title="Preview" sandbox="allow-scripts"/>
        </div>
    )
}

ReactDOM.render(<App/>, document.querySelector("#root"))
