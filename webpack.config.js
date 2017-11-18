/**
 * Created by hyd on 2017/11/18.
 */
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/js/main.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundler_[chunkhash:8].js'
    },

    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',
            // minify: {
            //     collapseWhitespace: true, // 合并空白字符
            //     removeComments: true, // 移除注释
            //     removeAttributeQuotes: true // 移除属性上的引号
            // }
        }),
        new cleanWebpackPlugin(['./dist'])
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(html|tpl)$/,
                use: ['html-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|mp3|svg|ttf)$/,
                use: {loader: 'url-loader', options: {limit: 10240}}
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: path.resolve(__dirname, '../node_modules')
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
        ]
    }

}