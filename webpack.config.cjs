const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-cheap-source-map",
  entry: "./app/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "client"),
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        loader: "file-loader",
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
};
