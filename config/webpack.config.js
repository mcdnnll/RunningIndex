var path = require('path');
var webpack = require('webpack');
var config = require('config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  debug: true, 
  cache: true,
  context: path.join(__dirname, '../'),
  entry: {
    app: path.join(__dirname, '../') + config.dir.client + 'index.js',
    common: ['react', 'redux'],
  },
  output: {
    path: config.dir.dist,
    publicPath: config.endpoints.static + '/',
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules'],
  },

  module: {
    loaders: [
      // Core loaders
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader'] },
      { test: /\.html$/, loader: 'file?name=[name].[ext]' },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common', 'styles'],
      minChunks: Infinity,
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
