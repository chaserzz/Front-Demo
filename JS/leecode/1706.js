// https://leetcode-cn.com/problems/where-will-the-ball-fall/
/**
 * @param {number[][]} grid
 * @return {number[]}
 */
 var findBall = function(grid) {
  let result = [];
  // 获得入口
  for(let entry = 0, l = grid[0].length, length = grid.length; entry < l; entry++){
    let level = 0;
    let postionX = entry;
    while(level < length){
      const towards = grid[level][postionX];
      // 方向向右
      if(towards === 1 && (postionX === l - 1 || (grid[level][postionX + 1] === -1))){
        postionX = -1;
        break;
      }
      if(towards === -1 && (postionX === 0 || (grid[level][postionX - 1] === 1))){
        postionX = -1;
        break;
      }
      postionX += towards;
      level++;
    }
    result.push(postionX);
  }
  return result;
};


var findBall = function(grid) {
  const n = grid[0].length;
  const ans = new Array(n);
  for (let j = 0; j < n; j++) {
      let col = j; // 球的初始列
      for (const row of grid) {
          const dir = row[col];
          col += dir; // 移动球
          if (col < 0 || col === n || row[col] !== dir) { // 到达侧边或 V 形
              col = -1;
              break;
          }
      }
      ans[j] = col;  // col >= 0 为成功到达底部
  }
  return ans;
};
