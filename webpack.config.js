const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: './public/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /.jade$/,
        loader: 'jade-loader',
      },
      {
        test: /.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './views/index.jade',
    }),
    new NodePolyfillPlugin(),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, './public'),
      publicPath: '/',
    },
    proxy: {
      '/': 'http://localhost:1337/',
    },
  },
};
