const gulp = require('gulp');
const mocha = require('gulp-mocha');
const del = require('del');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const webpack = require('webpack');
const plugins = require('gulp-load-plugins')();

const ts = plugins.typescript.createProject(
  'tsconfig.json',
  {
    typescript: require('typescript')
  }
);

const tslint = (project) => {
  return project.src()
    .pipe(plugins.cached('tslint'))
    .pipe(plugins.tslint({
      formatter: "verbose"
    }))
    .pipe(plugins.tslint.report());  
}

gulp.task('tslint', () => {
  return tslint(ts);
});

gulp.task('compile', () => {
  return ts.src()
    .pipe(plugins.sourcemaps.init())
    .pipe(ts())
    .js
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('.'));
});

gulp.task('mocha', () => {
  return gulp.src(['test/*.js'], {read: false})
    .pipe(mocha({ reporter: 'spec'}))
});

gulp.task('clean', (done) => {
  del(['./src/*.js', 'test/*.js', 'app/js/*.js']);
  done();
});

gulp.task('build', gulp.series('tslint', 'compile', (done) => {
  done();
}));

gulp.task('test', gulp.series('tslint', 'compile', 'mocha', (done) => {
  done();
}));

gulp.task('webpack', () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest("webapp/js"));
});
