const path = require("path");
const ZipPlugin = require("zip-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

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
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        terserOptions: {
          compress: {
            //unsafe: true,
            //unsafe_arrows: true,
            //unsafe_math: true,
            //unsafe_methods: true,
            //unsafe_undefined: true
            //booleans_as_integers: true
          },
          output: {
            comments  : false,
            ascii_only: true // Need this so unicode mute buttons work
          }
        },
      }),
    ],
  },
};
