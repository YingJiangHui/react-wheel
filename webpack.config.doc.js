const base = require('./webpack.config')
const htmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = Object.assign({},base,{
    mode: 'production',
    output:{
        path: path.resolve(__dirname, 'doc'),
    },
    plugins: [new htmlWebpackPlugin({
        template: './example.html',
    })],
})