const path = require('path')

module.exports = {
  entry: './assets/js/example.js',
  output: {
    filename: 'example.js',
    path: path.join(__dirname, 'dist')
  },
  target: 'node',
  externals: {
    // shows how we can rely on browser globals instead of bundling these dependencies,
    // in case we want to access jQuery from a CDN or if we want an easy way to
    // avoid loading all moment locales: https://github.com/moment/moment/issues/1435
    jquery: 'jQuery',
    moment: 'moment'
  },
  devtool: 'sourcemap',
  resolve: {
    extensions: [ '.js' ],
  }
}
