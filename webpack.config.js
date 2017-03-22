module.exports = {
  entry: "./src/index.js",
  output: {
    filename: 'dist/adClientLibrary.js',
    libraryTarget: 'var',
    library: 'AdClientLibrary'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2']
        }
      }
    ]
  }
}