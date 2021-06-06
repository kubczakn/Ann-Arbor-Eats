var Dotenv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv').config( {
    path: path.join(__dirname, '.env')
} );

module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'sourcemaps',
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    node: {
        net: 'empty',
    },
    module: {
        rules: [
            {
                // test: path.join(__dirname, '.'),
                // exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            }
        ]
    },
    plugins: [
         new Dotenv()
        // new webpack.DefinePlugin( {
        //     "process.env": dotenv.parsed
        // } ),
    ]
};
