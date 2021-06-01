import React, {useEffect, useRef} from 'react';
import './code-preview.css'

interface PreviewProps {
    code: string,
    error: string
}

const html = `
        <html lang="en">
            <head>
                <title>Test Sub HTML</title>
                <style>html {background-color: white}</style>
            </head>
            <body>
                <div id="root"></div>
                <script>
                    const handleError = (e) => {
                        const root = document.querySelector('#root');
                              root.innerHTML = '<div style="color:red;">'+ e +'</div>'
                              console.error("Inner Code Error "+e)
                    }
                    window.addEventListener('error',(event) => { handleError(event.error) })
                    window.addEventListener('message',(event) => {
                        try { eval(event.data); }
                        catch (e) { handleError(e) }
                    },false)
                </script>
            </body>
        </html>     
    `

const CodePreview: React.FC<PreviewProps> = ({code, error}) => {
    const iframe = useRef<any>()

    useEffect(() => {
        iframe.current.srcdoc = html;
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, "*")
        }, 100)
    }, [code])

    console.log(error)
    return (
        <div className="preview-wrapper">
            <iframe
                ref={iframe}
                srcDoc={html}
                title="CodePreview"
                sandbox="allow-scripts"
                style={{backgroundColor: 'white'}}
            />
            {error && <div className="preview-error">{error}</div>}
        </div>
    );
};

export default CodePreview;
