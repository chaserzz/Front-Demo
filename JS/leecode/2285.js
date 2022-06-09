/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
 var maximumImportance = function(n, roads) {
  let r = roads, ans = new Array(n).fill(0), m = r.length;
  // 因为是 城市a和城市b之间有一条双向的通道，因此是无向图，统计每个城市出来的有几条道路
  for(let i = 0; i < m; i++) {
    let x = r[i][0], y = r[i][1];
    ans[x]++;
    ans[y]++;
  }
  // 将每个城市拥有的道路总数升序排序
  ans.sort((a, b) => {
    return b - a;
  });
  // 按照最大的城市道路总数 * n，这样依次往下
  let sum = 0, t = n;
  for(let i = 0; i < n; i++) {
    sum += ans[i] * t;
    t--;
  }
  return sum;
};

console.log(
	maximumImportance(5,
		[[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]])
)