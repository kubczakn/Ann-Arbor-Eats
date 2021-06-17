var Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/main/js/app.jsx',
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
                test: /\.jsx$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            }
        ],
    },
    plugins: [
         new Dotenv()
    ]
};
