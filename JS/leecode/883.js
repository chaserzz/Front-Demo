/**
 * @param {number[][]} grid
 * @return {number}
 */
 var projectionArea = function(grid) {
	// x轴的投影面积为当前的子数组的最大值
	// y轴的投影面积为同一列的最大值
	// z轴的投影面积为x和y的长度
	let xy = 0,yz = 0,zx = 0;
	for(let i = 0; i < grid.length; i++){
		let yHeight = 0, xHeight = 0;
		for(let j = 0; j < grid.length; j++){
			xy += grid[i][j] > 0 ? 1 : 0; //xy下的投影面积
			yHeight = Math.max(yHeight,grid[i][j]); // 某一行下的最大数,即yz投影为每一行的最大数相加
			xHeight = Math.max(xHeight,grid[j][i]); // 某一列下的最大数，即xz投影为每一列的最大数相加
		}
		yz += yHeight;
		zx += xHeight;
	}
	return xy + yz + zx;
};