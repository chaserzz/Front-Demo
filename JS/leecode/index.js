/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
 var makesquare = function(matchsticks) {
  let sum = 0;
  matchsticks.forEach(item => {
      sum+=item;
  });
  if(sum % 4 !== 0) return false;
  const avg = sum / 4;
  matchsticks.sort((a,b) => b-a);
  let sums = new Array(4).fill(0);
  return dfs(0,matchsticks,sums,avg)
};

function dfs(i,matchsticks,sums,avg){
  // 所有的火柴都已经用完
  if(i >= matchsticks.length){
    return true;
  }
  for(let p = 0; p < sums.length; p++){
    if(sums[p] + matchsticks[i] > avg) continue;
    sums[p] += matchsticks[i];
    if(dfs(i + 1,matchsticks,sums,avg)){
      return true;
    }
    // 未匹配成功则需要回溯
    sums[p] -= matchsticks[i];
  }
  // 火柴没有边可以放置
  return false;
}

console.log(
  makesquare([5,5,5,5,4,4,4,4,3,3,3,3])
)