const gulp = require('gulp');

function func(cb) {
  console.log("func 执行")
  cb()
}

module.exports = {
  func
}