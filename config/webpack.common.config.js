var webpack = require('webpack');
var helpers = require('./helpers');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'libraries': './src/libraries.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.js', '.ts'],

    root: helpers.root('src'),

    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },
      {
        test: /\.scss$/,
        loader: 'raw-loader!sass-loader'
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }])
  ]

};
