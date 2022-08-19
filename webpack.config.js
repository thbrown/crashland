const path = require("path");
const ZipPlugin = require("zip-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: process.argv.indexOf("--watch") > -1,
  plugins: [
    new ZipPlugin({
      include: [/\.js$/, /\.html$/],
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
