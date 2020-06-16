const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let data = ["nav","index","search","detail"];

let generateHtmlPlugin = function() {
    let tmp = []
    data.forEach(item => {
        
        if(item === "index") {
            tmp.push(
                new HtmlWebpackPlugin({
                    filename: `index.html`,
                    template: `./src/index.html`,
                    chunks: [`${item}`]
                })
            )
        } else if(item === "nav") {
            tmp.push(
                new HtmlWebpackPlugin({
                    filename: `${item}.html`,
                    template: `./src/${item}.html`,
                })
            )
        } else {
            tmp.push(
                new HtmlWebpackPlugin({
                    filename: `${item}/${item}.html`,
                    template: `./src/template/${item}/${item}.html`,
                    chunks: [`${item}`]
                })
            )
        }

    });
    return tmp;
}

module.exports = {
    entry: {
        index: "./src/script/view/index/index.js",
        search: "./src/script/view/search/app.js",
        detail: "./src/script/view/detail/app.js",
    },
    output: {
        filename: "[name]/[name]_bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: 'html-loader',
                    }
                ]
            },
            {
                test:/\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000,
                        name: 'assets/[name].[ext]'
                    }
                }]
                
            }

        ]
    },
    plugins: [
        
    ].concat(generateHtmlPlugin())
}