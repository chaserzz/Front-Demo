// Node中的常用工具
const util = require("util")

async function fun(){
  return "hello Node"
}

const callBackFunction = util.callbackify(fun)  //callbackify将返回一个异常优先的回调函数

callBackFunction((err,res) => {
  if(err) throw err
  // console.log(res);
})

// 创建一个Father构造函数
function Father(){
  this.name = "father"
  this.sayHi = function (){
    console.log("Hi" + this.name);
  }
}

//在Father的原型链上添加showName方法
Father.prototype.showName = function (){
  console.log(this.name);
}

function Son(){
  this.name = "son"
}

util.inherits(Son,Father) // util.inherits(子构造函数，夫构造函数)  这个方法将会把子构造函数的proto指向父构造函数的prototype

const father = new Father()
father.sayHi()
father.showName()
console.log("-----------------")
const son = new Son()
son.showName()

util.inspect(father)  //inspect将对象转化成字符串的格式，
util.inspect(father,true) //第二个参数为递归转化的层数，默认为2层。层数与原型链相关
