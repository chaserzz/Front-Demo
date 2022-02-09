const cluster  = require('cluster');
const instance = 2; // 创建两个子进程
if(cluster.isMaster) {
  for (let i = 0; i < instance; i++) {
    cluster.fork();
  }
}else{
  require('./app.js') 
}