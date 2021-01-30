const base = require('./webpack.config')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = Object.assign({},base,{
    mode: 'development',
    plugins: [new htmlWebpackPlugin({
        template: './example.html',
        filename:'./example.html'
    })],
})