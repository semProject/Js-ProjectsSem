const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const { prod_Path, src_Path } = require("./path");
const { selectedPreprocessor } = require("./loader");

module.exports = {
  entry: {
    main: [
      //"@babel/polyfill",
       "./" + src_Path + "/index.js"]
  },
  output: {
    path: path.resolve(__dirname, prod_Path),
    filename: "[name].[hash].js"
  },
  // devtool: "cheap-module-source-map",
   devtool: "source-map",
 // devtool: "inline-source-map",

  cache: true,
  watch: true,
  watchOptions: {
    // aggregateTimeout: 500,
    // poll: 1000,
    ignored: /node_modules/
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: [
                [
                  "@babel/preset-env",
                  {
                  //  useBuiltIns: "usage"
                    // debug: true
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: selectedPreprocessor.fileRegexp,
        exclude: [/node_modules/],
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: false
              // sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              // sourceMap: true
            }
          },
          {
            loader: selectedPreprocessor.loaderName,
            options: {
              // sourceMap: true
            }
          }
        ]
      }
    ]
  },
  devServer: {
    hot: true,
    inline: true,
   // historyApiFallback: false,
    // noInfo: true,
  },
  resolve: {
    extensions: [".js"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new HtmlWebpackPlugin({
     favicon: "src/favicon.ico",
      inject: false,
      hash: false,
      template: "./" + src_Path + "/index.html",
      filename: "index.html"
    })
  ]
};
