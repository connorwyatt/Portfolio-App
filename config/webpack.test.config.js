module.exports = {

  devtool: 'inline-source-map',

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'

      },
      {
        test: /\.scss$/,
        loader: 'null-loader'
      }
    ]
  }

};
