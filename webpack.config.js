'use strict';

var webpack = require('webpack');
var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var vue = require("vue-loader");

module.exports = {
  entry: ['./src/app.js'],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "app.js",
    publicPath: "/dist/"
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: "vue"
      },
      {
        test: /\.js$/,
        exclude: /node_modules|vue\/dist/,
        loader: "babel",
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0'],
        }
      },
      {
        test: /\.(png|jpg|gif|ttf|svg|ico)$/,
        loader: "url-loader",
        query: {
          name: "[hash].[ext]",
          limit: 10000,
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          "style-loader", 'css-loader?sourceMap!sass-loader!cssnext-loader')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          "style-loader", "css-loader?sourceMap!cssnext-loader")
      }
    ]
  },
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract("css"),
      // you can also include <style lang="less"> or other langauges
      // less: ExtractTextPlugin.extract("css!less")
      sass: ExtractTextPlugin.extract("css!sass-loader")
    }
  },
  devtool: "eval-source-map",
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new ExtractTextPlugin("style.css", {
        allChunks: true,
        disable: false
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
}