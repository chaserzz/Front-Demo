// https://leetcode-cn.com/problems/knight-probability-in-chessboard/
/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
//每次增加的x以及y的坐标
const dirs = [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2]];
// 使用动态规划加dfs来解决
var knightProbability = function(n, k, row, column) {
 // 步长,横坐标，纵坐标，组成
 const dp = new Array(k + 1).fill(0).map(() => new Array(n).fill(0).map(() => new Array(n).fill(0)));
 for(let step = 0; step <= k; step++){
   // x坐标
   for(let x = 0; x < n; x++){
     // y坐标
     for(let y = 0; y < n; y++){
       // 步数为0的x，y坐标的位置一定在棋盘的上面
       if(step === 0){
         dp[step][x][y] = 1;
       }else{
         for(let dir of dirs){
           let nextX = x + dir[0]
           let nextY = y + dir[1]
           // 以当前的步数，如果下一步即nextX和nextY在棋盘上
           // 则当前位置的以及步数6留在棋盘上的位置应该属于下一步
           // 的k-1次的位置留在棋盘上的概率的1/8
           if(nextX >= 0 && nextX < n && nextY >= 0 && nextY < n ){
             dp[step][x][y] += dp[step - 1][nextX][nextY] / 8
           }
         }
       }
     }
   }
 }
 return dp[k][row][column];
};