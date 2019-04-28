const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
    entry: ['./src/index.js'],
    output: { pathinfo: true },
    devtool: 'eval',
    devServer: {
        contentBase: './public',
        hot: true,
        historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },{ 
          test: /\.scss$/i, 
          exclude: /node_modules/, 
          use: ['style-loader', 'css-loader', 'sass-loader'] 
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        },
         {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.(css|scss)$/, /\.json$/]
          }
      ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          inject: true,
          template: './public/index.html'
        }),
        new webpack.DefinePlugin({
            'HOMEPAGE': JSON.stringify('/vacininha/'),
            'PUBLIC_URL': JSON.stringify('/public')
        })
      ]
  });    