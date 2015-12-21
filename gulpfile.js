var gulp = require('gulp');
var babel = require('gulp-babel');
var run = require('gulp-run');
var mocha  = require('gulp-mocha');
var watch = require('gulp-watch');
var gulpif = require('gulp-if');
var gutil = require("gulp-util");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var runSequence = require('run-sequence');
var config = require('config');
var webpackConfig = require('./config/webpack.config.js');

require('babel-core/register');

var paths = {
  all: ['src/**/*', '!src/client/test/**/*'],
  clientTests: ['src/client/test/**/*.spec.js']
};

gulp.task('be-build', function(){
    // transpile scripts to build
    return gulp.src(paths.all, {base:'./src'})
      .pipe(gulpif(/.jsx?$/,babel()))
      .pipe(gulp.dest('./build'));
});

gulp.task('fe-build', function(done) {
  webpack(require('./config/webpack.config.js')).run(function(err, stats) {
    if(err) console.log('Error', err);
    done();
    });
});

gulp.task('build-all', function() {
    runSequence('clean', 'be-build', 'fe-build');
});

gulp.task('dev', ['serve-hot'], function() {

  // Override webpack path to fix dev-server path resolution (needs '/')
  webpackConfig.output.path = '/' + config.dir.dist;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(webpackConfig), {

    // Public path required to properly proxy the bundle requests back to the express server
    // Must mirror the normal webpack public path
    publicPath: webpackConfig.output.publicPath,
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

gulp.task('serve', function() {
  var cmd = new run.Command('node build/server/server.js', {verbosity:3});
  cmd.exec();
});

gulp.task('serve-hot', function() {
  var cmd = new run.Command('NODE_ENV=development node build/server/server.js', {verbosity:3});
  cmd.exec();
});

gulp.task('clean', function() {
  var cmd = new run.Command('rm -rf build/');
  cmd.exec();
})

gulp.task('client-tests', function() {
  return gulp
    .src(paths.clientTests)
    .pipe(mocha({reporter: 'spec'}))
    .on('error', console.log);
});
