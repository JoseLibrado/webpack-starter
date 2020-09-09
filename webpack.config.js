const HtmlWebPackPlugin         = require('html-webpack-plugin');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin'); 
const OptimizeCssAssetsPlugin   = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin'); 

module.exports =  {

    //linea para cambiar a versio de desarrpññp
    mode: 'development',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },
    // setteando las reglas, ledice al webpack que hacer con los diferentes archivos
    module: {
        rules: [
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
            filename: '[name].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/'}
            ]
        }),
                
        new CleanWebpackPlugin()
    ]

}