// https://leetcode-cn.com/problems/push-dominoes/
/**
 * @param {string} dominoes
 * @return {string}
 */
 var pushDominoes = function(dominoes) {
  const s = [...dominoes];
  let left = 'L' //左侧的多米诺牌的受力情况,假设向左
  let i = 0;
  let n = s.length;
  while(i < n){
    let j = i;
    //找到从前往后数的连续的.之后的第一个受力的多米诺牌
    while(j < n && s[j] === '.'){
      j++;
    };
    let right = j < n ? s[j] : 'R'; //右侧的受力情况，假设向右
    // 两侧受力相等
    if(left === right){
      while(i < j){
        s[i] = right;
        i++;
      }
    }else if(left === 'R' && right === 'L'){
      // 两侧是相对受力
      let k = j - 1;
      while(i < k){
        s[i] = 'R';
        s[k] = 'L';
        i++;
        k--;
      }
    }
    left = right;
    i = j + 1;
  }
  return s.join('');
};
console.log(pushDominoes(
  ".L.R...LR..L.."
))