/* 
给你一个 m * n 的矩阵，矩阵中的数字各不相同 。请你按任意顺序返回矩阵中的所有幸运数。
幸运数是指矩阵中满足同时下列两个条件的元素：
在同一行的所有元素中最小
在同一列的所有元素中最大

示例 1：
输入：matrix = [[3,7,8],[9,11,13],[15,16,17]]
输出：[15]
解释：15 是唯一的幸运数，因为它是其所在行中的最小值，也是所在列中的最大值。

示例 2：
输入：matrix = [[1,10,4,2],[9,3,8,7],[15,16,17,12]]
输出：[12]
解释：12 是唯一的幸运数，因为它是其所在行中的最小值，也是所在列中的最大值。

示例 3：
输入：matrix = [[7,8],[1,2]]
输出：[7]
 */
// time: 100 , store: 11
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
 var luckyNumbers  = function(matrix) {
  const rowObj = {}; // 每一行的最小值,以以及该行对应的列
  const luckList = []; // 最终返回值
  const rowLength = matrix.length;
  matrix.forEach(row => {
    let rowMin = Infinity; // 先找到每一行的最小值
    let minList = 0;
    row.forEach((num,index) => {
      if(num < rowMin){
        rowMin = num;
        minList = index
      };
    });
    if(!rowObj[minList]){
      rowObj[minList] = rowMin
    }else{
      if(rowObj[minList] < rowMin){
        rowObj[minList] = rowMin
      }
    }
  });
  Object.keys(rowObj).forEach(indey => {
    let isLucky = true;
    for(let i = 0; i < rowLength; i++){
      if(matrix[i][indey] > rowObj[indey]){
        isLucky = false;
        break;
      }
    }
    if(isLucky) luckList.push(rowObj[indey]);
  });
  return luckList;
};

// 其他解法

/* 假设有两个点x1,y1和x2,y2，它们都是幸运数。
根据题目描述，我们有以下大小关系：
matrix[x1][y1] <= matrix[x1][y2] (行最小)
matrix[x1][y1] >= matrix[x2][y1] (列最大)
matrix[x2][y2] <= matrix[x2][y1] (行最小)
matrix[x2][y2] >= matrix[x1][y2] (列最大)

我们会发现:

matrix[x2][y2] >= matrix[x1][y2] >= matrix[x1][y1]
matrix[x1][y1] >= matrix[x2][y1] >= matrix[x2][y2]

所以只有matrix[x1][y1] == matrix[x2][y2]这一种情况，
所以只有一个值时幸运值，该值为行的最大值，为列的最小值

而这个值应该就是行的最小值的最大值以及列的最大值的最小值
假设我们的获取的r1，它不是行的最小值的最大值，那么一定会存在一个r2，且r2>r1
那么我们可以推断到和r1同列的数组中一个会有一个值时要>r1的，因为在r2的那一行中r2是最小值
那么r1的那个数据其实就是排除了我们需要找的幸运数字
 */

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
 var luckyNumbers  = function(matrix) {
  let a = 0, b = 100005;
  for(let i = 0; i < matrix.length; i ++){
    let cur = 100005;
    for(let j = 0; j < matrix[0].length; j++){
      cur = Math.min(cur,matrix[i][j]);
    }
    a = Math.max(cur,a);
  }
  for(let j = 0; j < matrix[0].length; j++){
    let cur = 0;
    for(let i = 0; i < matrix.length; i++){
      cur = Math.max(cur,matrix[i][j]);
    }
    b = Math.min(cur,b);
  }
  return a === b ? [a] : [];
};
