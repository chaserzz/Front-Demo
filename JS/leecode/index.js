/**
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
 var oneEditAway = function(first, second) {
  const m = first.length, n = second.length;
  if(m - n === 1){
    return onInsert(first,second)
  }else if(n - m === 1){
    return onInsert(second,first)
  }else if (m === n){
    let hasDiff = false;
    for(let i = 0; i < m; i++){
      if(first[i] !== second[i]){
        if(hasDiff){
          return false
        }else{
          hasDiff = true
        }
      }
    }
    return true
  }
  return false;
};

var onInsert = function(short,long){
    let index1 = 0, index2 = 0;
    debugger
    while(index1 < short.length && index2 < long.length){
      if(short[index1] == long[index2]){
        index1++;
      }
      index2++;
      if(index2 - index1 > 1){
        return false;
      }
    }
    return true;
}

oneEditAway("islander",
"slander")