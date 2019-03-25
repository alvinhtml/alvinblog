//webpack

let path = require('path')
let webpack = require('webpack') //webpack 插件
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin') //抽离 css 文件，使用这个插件需要单独配置JS和CSS压缩
let UglifyJsPlugin = require('uglifyjs-webpack-plugin') //压缩JS
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') //压缩CSS
let CopyWebpackPlugin = require('copy-webpack-plugin') //webpack copy 插件


module.exports = {

    optimization: { //优化项
        minimizer: [ //压缩优化
            new UglifyJsPlugin({
                cache: true, //缓存
                parallel: true, //并发打包
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    },

    mode: 'development', //两种模式， production (生产模式) development（开发模式）

    entry: {
        //init: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'react-router-redux', 'redux-thunk', 'isomorphic-fetch'],
        bundle: './frontent/index.jsx',
        website: './frontent/website.js',
    },

    devtool: 'source-map', //源码映射，生成一个映射文件，帮我们定位源码文件

    output: {
        filename: 'js/[name].js',  //打包后的文件名
        path: path.resolve(__dirname, './build'), //路径必须是绝对路径
        publicPath: 'http://localhost:8080/'
    },

    resolve: {
        modules: [path.resolve('node_modules')],
        extensions: ['.js', '.css', '.jsx', '.less'] //配置省略后缀名
    },

    module: { //模块

        rules: [ //规则
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,  //排除
                use: {
                    loader: 'babel-loader',
                    options: { //用 babel-loader 转化 ES6-ES5
                        presets: [ //这里是大插件集合
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [//这里可以配置一些小的插件
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-syntax-dynamic-import'
                        ]
                    }
                }
            },
            {
                test: /\.(jpg|png|gif|jpeg|bmp|eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 50 * 1024,
                        outputPath: '/images',
                    }
                }
            }
        ]
    },


    plugins: [ //数组，放着所有 webpack 插件
        new HtmlWebpackPlugin({
            template: './frontent/index.php',
            filename: 'index.blade.php',
            // minify: {
            //     removeComments: true,
            //     removeAttributeQuotes: true,
            //     collapseWhitespace: true
            // },
            hash: true,
            chunks: ['bundle']
        }),

        new HtmlWebpackPlugin({
            template: './frontent/index.php',
            filename: 'index.html',
            // minify: {
            //     removeComments: true,
            //     removeAttributeQuotes: true,
            //     collapseWhitespace: true
            // },
            hash: true,
            chunks: ['bundle']
        }),

        new MiniCssExtractPlugin({
            filename: 'css/style.min.css'
        }),

        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'build/js/*'),
            to: path.resolve(__dirname, 'public/js/'),
            flatten: true
        }, {
            from: path.resolve(__dirname, 'build/css/*'),
            to: path.resolve(__dirname, 'public/css/'),
            flatten: true
        }, {
            from: path.resolve(__dirname, 'build/images/*'),
            to: path.resolve(__dirname, 'public/images/'),
            flatten: true
        }, {
            from: path.resolve(__dirname, 'build/index.blade.php'),
            to: path.resolve(__dirname, 'resources/views/admin/index.blade.php')
        }]),

        new webpack.DefinePlugin({
            DEV: JSON.stringify('dev'),
        }),

    ],


    // watch: true,
    // watchOptions: {
    //     poll: 2000, //每秒问我多少次
    //     aggregateTimeout: 2000, //防抖
    //     ignored: /node_modules|vendor|build|public|resources/
    // },

    devServer: {
        port: 8080,
        progress: true, //进度条
        contentBase: './build', //配置目录
        open: true, //在DevServer第一次构建完成时，自动用浏览器打开网页
        historyApiFallback: true,

        proxy: {
            '/api': {
                target: 'http://blog.xuehtml.com',
                changeOrigin: true, //changeOrigin 的意思就是把 http 请求中的 Origin 字段进行变换，在浏览器接收到后端回复的时候，浏览器会以为这是本地请求，而在后端那边会以为是在站内的调用。
            },
            '/uploads': {
                target: 'http://blog.xuehtml.com',
                changeOrigin: true,
            }
        }
    }
}
