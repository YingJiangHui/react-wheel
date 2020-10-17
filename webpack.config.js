const path = require('path')
module.exports = {
    mode: 'production',
    entry: {
        index: './lib/index.tsx'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts']
    },
    output: {
        path: path.resolve(__dirname, 'dist/lib'),
        library: 'wheel',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
            },
            {
                test:/\.scss/,
                loader: ['style-loader','css-loader','sass-loader']
            }
        ]
    }
}