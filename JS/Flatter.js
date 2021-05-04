//ES5

function flat(arr){
  const result = []
  for(const item of arr){
    //遍历判断当前的item是不是一个数组
    if(Array.isArray(item)){
      //当前对象是一个数组则进行递归操作
      result.concat(flat(item))
    }else{
      result.push(item)
    }
  }
  return reuslt
}

//ES6
function flater(arr){
  //对数组进行some遍历
  while(arr.some((item) => Array.isArray(item))){
    arr = [].concat(...arr)
  }
}
