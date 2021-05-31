import React, {useEffect, useRef} from 'react';

interface PreviewProps {
    code: string
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

const Preview: React.FC<PreviewProps> = ({code}) => {
    const iframe = useRef<any>()

    useEffect(() => {
        iframe.current.srcdoc = html;
        iframe.current.contentWindow.postMessage(code, "*")

    }, [code])

    return (
        <iframe ref={iframe} srcDoc={html} title="Preview" sandbox="allow-scripts"/>
    );
};

export default Preview;
