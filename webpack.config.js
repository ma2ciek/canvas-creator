const webpack = require('webpack');

module.exports = {
    entry: './app/demo/demo.ts',
    output: {
        filename: './dist/bundle.js'
    },
    // Turn on sourcemaps
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ }
        ],
        preloader: [
            { test: /\.js$/, loader: 'source-map-loader' }
        ]
    }
}