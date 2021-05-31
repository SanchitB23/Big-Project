import React, {useEffect, useRef} from 'react';
import './preview.css'

interface PreviewProps {
    code: string
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

const Preview: React.FC<PreviewProps> = ({code}) => {
    const iframe = useRef<any>()

    useEffect(() => {
        iframe.current.srcdoc = html;
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, "*")
        }, 100)
    }, [code])

    return (
        <div className="preview-wrapper">
            <iframe
                ref={iframe}
                srcDoc={html}
                title="Preview"
                sandbox="allow-scripts"
                style={{backgroundColor: 'white'}}
            />
        </div>
    );
};

export default Preview;
