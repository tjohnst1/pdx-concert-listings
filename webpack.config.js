module.exports = {
  entry: "./app/index.js",
  output: {
    path: './dist',
    filename: "bundle.js",
    publicPath: '/'
  },
  devServer: {
    inline: true,
    contentBase: './dist',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: ["add-module-exports"]
        }
      },
      {
        test: /\.html$/,
        loader: 'raw'
      }
    ]
  }
}
