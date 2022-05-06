/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var numSubarrayProductLessThanK = function(nums, k) {
	if(k === 0) return 0;
	let left = 0;
	let right = 0;
	let mluti = 1;
	let ans = 0;
	while(right < nums.length){
		mluti *= nums[right];
		while(mluti>= k){
			mluti /= nums[left]
			left ++;
		};
		ans += right - left + 1;
		right ++;
	}
	return ans;
};
numSubarrayProductLessThanK([10,5,2,6],100)