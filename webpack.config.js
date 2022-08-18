const path = require("path");
var ZipPlugin = require("zip-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: process.argv.indexOf("--watch") > -1,
  optimization: {
    minimize: process.argv.indexOf("--min") > -1,
  },
  plugins: [new ZipPlugin({})],
};
