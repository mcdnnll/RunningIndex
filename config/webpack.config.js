var path = require('path');
var webpack = require('webpack');
var config = require('config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var autoprefixer = require('autoprefixer');
var precss = require('precss');

var rootDir = path.join(__dirname, '../');

module.exports = {
  debug: true,
  cache: true,
  context: rootDir,
  entry: {
    app: [rootDir + config.dir.client + 'index'],
    styles: [rootDir + config.dir.styles + 'ri'],
  },

  output: {
    path: config.dir.dist,
    publicPath: config.endpoints.static + '/',
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    modulesDirectories: ['node_modules'],
  },

  module: {
    loaders: [
      // Core loaders
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader'] },
      { test: /\.html$/, loader: 'file?name=[name].[ext]' },
      { test: /\.css$/, loaders: ["style-loader", "css-loader", "postcss-loader"] },
    ],
  },

  postcss: function() {
    return [autoprefixer, precss];
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
