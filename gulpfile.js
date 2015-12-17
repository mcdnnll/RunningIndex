var gulp = require('gulp');
var babel = require('gulp-babel');
var run = require('gulp-run');
var mocha  = require('gulp-mocha');
var watch = require('gulp-watch');
var gulpif = require('gulp-if');
var webpack = require('webpack');
var runSequence = require('run-sequence');

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

gulp.task('serve', function() {
  var cmd = new run.Command('node build/server/server.js', {verbosity:3});
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
