var gulp = require('gulp');
var babel = require('gulp-babel');
var run = require('gulp-run');
var mocha  = require('gulp-mocha');
var watch = require('gulp-watch');
var gulpif = require('gulp-if');
var gutil = require("gulp-util");
var server = require('gulp-express');
var rm = require('gulp-rimraf');
var runSequence = require('run-sequence');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('config');

var webpackDevConfig = require('./config/webpack.config.dev.js');

require('babel-core/register');

var paths = {
  all: ['src/**/*', '!src/client/test/**/*'],
  src: {
    serverDir: 'src/server/**/*',
  },
  build: {
    root: 'build/',
    serverDir: 'build/server/',
    server: 'build/server/server.js'
  },
  clientTests: ['src/client/test/**/*.spec.js'],
  serverTests: ['src/server/test/**/*.spec.js', '!/src/server/test/models/**/*']
};

/*==========================================
=            Client build tasks            =
==========================================*/


gulp.task('dev', function() {

  // Override webpack path to fix dev-server path resolution (needs '/')
  webpackDevConfig.output.path = '/' + config.dir.dist;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(webpackDevConfig), {

    // Public path required to properly proxy the bundle requests back to the express server
    // Must mirror the normal webpack public path
    publicPath: webpackDevConfig.output.publicPath,
    stats: {
      noColors: true
    },
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:9001",
      "Access-Control-Allow-Credentials": true
    },
    proxy: {
      '*': 'http://localhost:9000'
    }
  }
    ).listen(config.ports.webpack, "localhost", function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      gutil.log("[webpack-dev-server]", "http://localhost:" + config.ports.webpack + "/webpack-dev-server/");
  });
});

gulp.task('client-tests', function() {
  return gulp
    .src(paths.clientTests)
    .pipe(mocha({reporter: 'spec'}))
    .on('error', console.log);
});

gulp.task('client-dev', function() {
  var cmd = new run.Command('NODE=ENV=development webpack --config ./config/webpack.config.dev.js');
  cmd.exec();
});

gulp.task('client-prod', function() {
  var cmd = new run.Command('NODE_ENV=production webpack --config ./config/webpack.config.prod.js -p');
  cmd.exec();
});

/*==========================================
=            Server build tasks            =
==========================================*/

gulp.task('server-clean', function() {
  return gulp.src(paths.build.serverDir).pipe(rm());
})

gulp.task('server-build', function() {
  return gulp.src(paths.src.serverDir)
    .pipe(gulpif(/.jsx?$/,babel()))
    .pipe(gulp.dest(paths.build.serverDir));
});

gulp.task('server-watch', function() {

  var options = {};
  options.env = process.env;

  options.env.NODE_PATH = '.';
  options.env.NODE_ENV = 'development';
  options.env.SECURITY_TOKEN = '1';
  options.env.DEV_DB = true;

  server.run([paths.build.server], options);
  gulp.watch(paths.src.serverDir, ['server-build', server.run]);
});

gulp.task('serve', function() {
  runSequence('server-clean', 'server-build', 'server-watch');
});

gulp.task('serve-hot', function() {
  var cmd = new run.Command('NODE_ENV=development node build/server/server.js', {verbosity:3});
  cmd.exec();
});

gulp.task('server-tests', function() {
  return gulp
    .src(paths.serverTests)
    .pipe(mocha({reporter: 'spec'}))
    .on('error', console.log);
});

/*=============================================
=            Ancillary build tasks            =
=============================================*/

gulp.task('full-build', function(){
    // transpile all cripts to build
    return gulp.src(paths.all, {base:'./src'})
      .pipe(gulpif(/.jsx?$/,babel()))
      .pipe(gulp.dest(paths.build.root));
});

gulp.task('load-db', function() {
  var cmd = new run.Command('node support/loadDBData.js');
  cmd.exec();
});

gulp.task('prod', function() {
  runSequence('server-build', 'client-prod');
});
