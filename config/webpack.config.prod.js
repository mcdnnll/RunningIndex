var path = require('path');
var webpack = require('webpack');
var config = require('config');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

var rootDir = path.join(__dirname, '../');

module.exports = {
  cache: true,
  context: rootDir,
  devtool: 'cheap-module-source-map',
  entry: {
    app: [rootDir + config.dir.s_client + 'index'],
    styles: [rootDir + config.dir.s_styles + 'ri'],
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
      { test: /\.jsx?$/, exclude: [/node_modules/, /src\/client\/test/], loaders: ['babel-loader'] },
      { test: /\.html$/, loader: 'file?name=[name].[ext]' },
      { test: /\.css$/, loaders: ["style-loader", "css-loader", "postcss-loader"] },
    ],
  },

  postcss: function() {
    return [autoprefixer, precss];
  },

  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': Object.keys(process.env).reduce(function(o, k) {
        o[k] = JSON.stringify(process.env[k]);
        return o;
      }, {})
    }),
  ],
};
