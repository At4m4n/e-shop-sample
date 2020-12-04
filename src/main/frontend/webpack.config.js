'use strict';
let path = require('path');

let port = 8080;
let srcPath = path.join(__dirname, '/../src');
let publicPath = '/assets/';
let webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js'
  ],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../../../target/classes/static/'),
    filename: 'bundle.js',
    publicPath: path.resolve(__dirname, '../../../target/classes/static/'),
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        enforce: "pre",
        use: 'eslint-loader'
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /bootstrap\/dist\/js\/umd\//,
        use: 'imports-loader?jQuery=jquery'
      },
      {
        test: /\.sass/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.scss/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        use: {
          loader: 'url-loader',
        }
      }
    ]
  }
};
