let func = function (){
  if(arguments.length === 0){

  }else{
    return arguments.callee;
  }
}
var curring = function (fn){
  var args = [];
  return func;
};

var demo = function (){
  return;
}

var curDemo = curring(demo);
var args = curDemo(1);
console.log(args === func);