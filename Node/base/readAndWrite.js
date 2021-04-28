var fs = require("fs");
var zlib = require('zlib');


// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
fs.createReadStream("data.txt").pipe(
  fs.createWriteStream("output.txt")
)

console.log("程序执行完毕")
