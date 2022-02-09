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

