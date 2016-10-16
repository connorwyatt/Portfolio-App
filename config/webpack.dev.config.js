var webpack = require('webpack'),
  webpackMerge = require('webpack-merge'),
  commonConfig = require('./webpack.common.config.js'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  debug: true,

  devtool: 'inline-source-map',

  output: {
    path: helpers.root('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  devServer: {
    port: 8080,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    outputPath: helpers.root('dist')
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    }),
    new webpack.DefinePlugin({
      ENV: JSON.stringify('DEVELOPMENT'),
      API_BASE_PATH: JSON.stringify('http://localhost:8081/api')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'libraries', 'polyfills']
    })
  ]

});
