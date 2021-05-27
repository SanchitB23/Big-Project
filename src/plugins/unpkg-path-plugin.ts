import * as esbuild from 'esbuild-wasm';


export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup: function (build: esbuild.PluginBuild) {

            // Handle root entry file
            build.onResolve({filter: /(^index\.js$)/}, () => {
                return {
                    namespace: 'a',
                    path: 'index.js'
                }
            })
            // Handle relative paths in a module (./ and ../)
            build.onResolve({filter: /^\.+\//}, (args: any) => {
                return {
                    namespace: 'a',
                    path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href
                }
            })

            build.onResolve({filter: /.*/}, async (args: any) => {
                    return {
                        namespace: 'a',
                        path: `https://unpkg.com/${args.path}`
                    }
                }
            );


        },
    };
};
