function _typeof(obj){
  //可以根据对象的toString方法来辅助进行类型的判断。
  //toString 将会返回[object 类型]的字段类型
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}