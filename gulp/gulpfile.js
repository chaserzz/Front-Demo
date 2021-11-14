const { src, dest, parallel} = require('gulp');
const htmlMin = require("gulp-htmlmin");
const babel = require("gulp-babel");
const terser = require("gulp-terser");


function htmlTask (cb) {
  src("./src/*.html")
  .pipe(htmlMin({
    collapseWhitespace: true
  }))
  .pipe(dest("./dist"))

  cb()
}

function jsTask (cb){
  src("./src/**.js")
  .pipe(babel({
    presets: ['@babel/preset-env']
  }))
  .pipe(terser({
    mangle: {
      toplevel: true
    }
  }))
  .pipe(dest("./dist"))
  cb()
}

function cssTask (cb){
  src("./src/*.css")
  .pipe(dest("./dist"))
  cb()
}
exports.default = parallel(htmlTask, jsTask, cssTask);
