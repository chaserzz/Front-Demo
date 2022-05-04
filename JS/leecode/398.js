/**
 * @param {number[]} nums
 */
var Solution = function(nums) {
	this.array = nums;
	return this;
};

/** 
 * @param {number} target
 * @return {number}
 */
Solution.prototype.pick = function(target) {
	let index = 0;
	for(let i = 0, count = 0; i < this.array.length; i ++){
		if(target === this.array[i]){
			//水池抽样: 随机获取到当前下标的几率 = k / 1
			count++;
			if(Math.floor(Math.random() * count) === 0){
				index = i;
			}
		}
	}
	return index;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.pick(target)
 */
