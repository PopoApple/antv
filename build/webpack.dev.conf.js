'use strict'
const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: 'main.html',
      inject: true,
      serviceWorkerLoader: `<script>${fs.readFileSync(
        path.join(__dirname, './service-worker-dev.js'),
        'utf-8'
      )}</script>`,
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: '404.html',
      inject: true,
      chunks: ['notFound']
    }),
    new HtmlWebpackPlugin({
      filename: '500.html',
      template: '500.html',
      inject: true,
      chunks: ['serverFail']
    }),
    new HtmlWebpackPlugin({
      filename: 'error.html',
      template: 'error.html',
      inject: true,
      chunks: ['error']
    }),
    new FriendlyErrorsPlugin()
  ]
})
