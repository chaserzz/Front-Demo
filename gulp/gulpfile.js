const { src, dest, parallel, series} = require('gulp');
const htmlMin = require("gulp-htmlmin");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const gulpInject = require('gulp-inject');

function htmlTask (cb) {
  return src("./src/*.html")
  .pipe(htmlMin({
    collapseWhitespace: true
  }))
  .pipe(dest("./dist"))
}

function jsTask (cb){
  return src("./src/**.js")
  .pipe(babel({
    presets: ['@babel/preset-env']
  }))
  .pipe(terser({
    mangle: {
      toplevel: true
    }
  }))
  .pipe(dest("./dist"))
}

function cssTask (cb){
  return src("./src/*.css")
  .pipe(dest("./dist"))
}

function injectTask(cb){
  return src("./dist/*.html")
         .pipe(gulpInject([src(['./dist/*.js','./dist/*.css'])],{
           relative: true 
         }))
         .pipe(dest("./dist "))
}
exports.default = series(parallel(htmlTask, jsTask, cssTask), injectTask);
