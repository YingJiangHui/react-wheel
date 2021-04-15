const base = require('./webpack.config')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = Object.assign({},base,{
    mode: 'development',
    entry:{
        example:'./example.tsx'
    },
    plugins: [new htmlWebpackPlugin({
        template: './example.html',
    })],
})