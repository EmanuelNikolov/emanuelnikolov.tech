const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    optimization: {
        minimizer: [
            new UglifyJsPlugin(),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            'jquery': 'jquery/dist/jquery.slim.js',
        }
    },
    entry: [
        'babel-polyfill',
        './src/js/index.js',
        './src/scss/main.scss',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: [/node_modules/, /dist/],
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
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader?name=fonts/[name].[ext]"
            },
            {
                test: /\.(png|jpе?g|gif)$/,
                loader: 'file-loader?name=img/[name].[ext]',
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
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
        }),
        new HtmlWebpackPlugin({
            favicon: 'src/img/favicon.png',
            template: 'src/index.html',
        }),
        new CleanWebpackPlugin(['dist']),
    ],
    devtool: false,
    target: 'web',
};