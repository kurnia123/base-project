const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const gg = new RegExp('/[a-zA-Z0-9]+\.html/g');

let dataPage = [,"index","search","detail","movie","tvSeries","genre"];
let dataComponent = ["footer","nav","navRight"];


let generateHtmlPlugin = function() {
    let tmp = []

    generatePage(data => {
        tmp.push(...data);
    });
    generateComponent(data => {
        tmp.push(...data);
    });
    
    return tmp;
}



let generatePage = function (callback) {  
    let tmp = []
    dataPage.forEach(item => {
        if (item === "index") {
            tmp.push(
                new HtmlWebpackPlugin({
                    filename: `index.html`,
                    template: `./src/index.html`,
                    chunks: [`${item}`]
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

    })
    callback(tmp);
}

let generateComponent = function (callback) {
    let tmp = []
    dataComponent.forEach(item => {
        tmp.push(
            new HtmlWebpackPlugin({
                filename: `component/${item}.html`,
                template: `./src/template/component/${item}.html`,
                chunks: [``]
            })
        )

    })
    callback(tmp);
}


module.exports = {
    entry: {
        index: "./src/script/view/index/index.js",
        search: "./src/script/view/search/app.js",
        detail: "./src/script/view/detail/app.js",
        movie: "./src/script/view/movie/app.js",
        tvSeries: "./src/script/view/tvSeries/app.js",
        genre: "./src/script/view/genre/app.js"
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