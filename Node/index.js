// const queuedObservers = new Set();
const Log = require('./log.js');
// const observe = fn => queuedObservers.add(fn);
// const observable = obj => new Proxy(obj, {set});

// function set(target, key, value, receiver) {
//   const result = Reflect.set(target, key, value, receiver);
//   queuedObservers.forEach(observer => observer());
//   return result;
// }
const log = new Log(false,2000,20,3);

log.start();

setTimeout(() => {
  log.info('test',1);
  setTimeout(() => {
    log.info('test',2);
  }, 10000);
},5000);