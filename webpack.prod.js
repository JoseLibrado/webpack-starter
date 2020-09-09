const HtmlWebPackPlugin         = require('html-webpack-plugin');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin'); 
const OptimizeCssAssetsPlugin   = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin              = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin'); 

module.exports =  {

    //linea para cambiar a versio de desarrpññp
    mode: 'production',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },
    output: {
        filename: 'main.[ContentHash].js' //crea el main.js agregandole un hash despues del nombre  main.f9ccda077678df7d41f9.js
    },
    // setteando las reglas, ledice al webpack que hacer con los diferentes archivos
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]

            },
            {
                test: /\.html$/i, //busca los archivos index html
                loader: 'html-loader', // adjunta el archivo JS al index
                options: {
// Linea 15 cuando es true ofusca el contenido del archivo adjuntando en una sola linea el cpodigo omitiendo espacions, interlineados y comentarios.
                    attributes: false, 
                },
            },
            {
                test: /\.(jpg|jpge|png|svg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[ContentHash].css',//crea el main.css agregandole un hash despues del nombre main.c2026798f745cbd5c4e8.css
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/'}
            ]
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin()
    ]

}