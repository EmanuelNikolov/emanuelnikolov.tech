const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    optimization: {
        minimize: true
    },
    entry: [
        'babel-polyfill',
        './src/js/index.js',
        './src/scss/main.scss',
        './node_modules/mdbootstrap/scss/mdb.scss',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js?$/,
                exclude: [/node_modules/, /vendors/, /dist/],
                loader: 'eslint-loader',
                options: {
                    fix: true,
                },
            },
            {
                test: /\.js?$/,
                exclude: [/node_modules/, /vendors/, /dist/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'stage-0'],
                        },
                    },
                ],
            },
            {
                test: /\.scss?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "file-loader?name=fonts/[name].[ext]"
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    useRelativePath: true,
                },
            },
            // particles.js
            {
                test: /particles\.js/,
                loader: 'exports-loader?particlesJS=window.particlesJS,pJS=window.pJS'
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'main.css' }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            Waves: 'node-waves',
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new CleanWebpackPlugin(['dist']),
    ],
    devtool: false,
    target: 'web',
};