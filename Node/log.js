const fsPromise = require('fs').promises;
const fs = require('fs');
const path = require('path');

const logFilePath = `${__dirname}/log`
const fileStreams = {};
const cacheLogStr = {};
class Log{
  /**
  * @param {boolean} cacheEnable 是否打开日志缓存模式，默认打开
  * @param {int} cacheTime 缓存处理时间，默认 2 秒，会定时入文件
  * @param {int} maxLen 单个日志文件最大缓存长度，默认100000
  * @param {int} maxFileStream 最大缓存文件句柄数，默认是 1000
  */
  constructor(cacheEnable=true, cacheTime=2000, maxLen=100000, maxFileStream=1000) {
   this.cacheTime = cacheTime;
   this.cacheEnable = cacheEnable;
   this.maxLen = maxLen;
   this.maxFileStream = maxFileStream;
   this.currentFileStreamNum = 0;
  }

  // start 开启日志系统
  start (){
    if(this.cacheEnable){
      this._intervalWrite();
    }
  }

  // 定时写入数据
  _intervalWrite(){
    setInterval(async () => {
      if(Object.keys(cacheLogStr).length < 1){ // 空数据不处理
        return;
      }
      for(let key in cacheLogStr){
        // 当日志缓存中为空，表示已经进行过一次文件流的相关惭怍
        // 则可以关闭该文件流以及清空缓存的内容
        if(cacheLogStr[key] === ''){
          this._clear(key);
          continue;
        }
        // 否则则需要进行文件流的写入，并且在写入后对文件进行清空
        await this._addLog(key,cacheLogStr)
        cacheLogStr[key] = ''

      }
    },this.cacheTime);
  }

  /**
  * 
  * @description 根据缓存情况，判断是否将日志写入文件，还是写入缓存
  * @param {string}} fileType 日志模块 - 其实就是文件名
  * @param {string|json} logInfo 日志信息
  */
  async _flush(fileType,logInfo){
    // 过滤空数据
    if(!fileType || !logInfo){
      return;
    }
    let logStr = logInfo;
    if(typeof logInfo === 'object'){
      logStr = JSON.stringify(logInfo);
    }
    // 再次过滤空数据
    if(!logStr){
      return;
    }
    // 未开启缓存
    if(!this.cacheEnable){
      // 添加添加数据
      this._addLog(fileType,logInfo);
      return;
    }
    // 命中缓存，则缓存当前的语句
    if(cacheLogStr[fileType]){
      // 当缓存小于最大长度时，将数据放到缓存中去
      if(cacheLogStr[fileType].length <= this.maxLen){
        cacheLogStr[fileType] = `${cacheLogStr[fileType]}\n${logStr}`;
      }else{
        // 添加数据
        await this._addLog(fileType,`${cacheLogStr[fileType]}\n${logStr}`);
        cacheLogStr[fileType] = '';
      }
    }else{
      cacheLogStr[fileType] = logStr;
    }
  }

  //将内容输入到文件中
  async _addLog(fileType,data){
    // 获取文件流
    const fileStream = await this._getFileStream(fileType);
    try {
      console.log(data,fileStream);
      fileStream.write(`${data}\n`, 'utf8');
      this.currentFileStreamNum --;
      delete fileStreams[fileType]
      fileStream.end();
    } catch(err){
      console.log(err);
    }
  }

  // 获取对应的文件读入流
  /**
   * 
   * @param {*} fileType 
   * @returns {fs.WriteStream}
   */
  async _getFileStream(fileType){
    // 命中文件流的缓存
    if(fileStreams[fileType]){
      return fileStreams[fileType]
    }
    const filePath = this._getFilePath(fileType);
    await fsPromise.stat(filePath).catch(async err => {
      if(err.code === 'ENOENT'){
          await fsPromise.writeFile(filePath, '');
      }
    });
    const fileStream = fs.createWriteStream(filePath, {encoding:'utf8', flags:'a'});

    // 根据是否目前缓存的文件流最大值判断是否需要进行缓存
    if(this.currentFileStreamNum < this.maxFileStream) {
        this.currentFileStreamNum ++;
        fileStreams[fileType] = fileStream;
    }

    return fileStream;
  }

  // 获得对应的文件路径
  _getFilePath(fileName){
    return path.join(logFilePath,`${fileName}.log`)
  }

  // 关闭文件流以及清空对应的日志模块对应的缓存
  async _clear(fileType){
    const fileStream = await this._getFileStream(fileType);
    // 超出缓存的最大值的数据进行清空
    delete cacheLogStr[fileType];
    delete fileStreams[fileType]; // 清空文件流缓存
    if(!fileStream) return;
    this.currentFileStreamNum --;
    fileStream.end();
  }

  info(fileType,logInfo){
    if(!fileType || !logInfo){
      return;
    }
    this._flush(fileType,logInfo);
  }
}

module.exports = Log;