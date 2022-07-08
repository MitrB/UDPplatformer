const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  entry: ['./app/client/client.js', './app/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client')
  }
}