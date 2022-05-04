/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxRotateFunction = function(nums) {
	let numsSum = 0,f = 0,res = 0;
	for(let index = 0; index < nums.length; index++){
		const number = nums[index]
		numsSum += number;
		res += number * index;
	}
	f = res;
	for(let i = nums.length - 1; i > 0; i--){
		f = f + numsSum - nums.length * nums[i];
		res = Math.max(res,f);
	}
	return res;
};

console.log(
		maxRotateFunction([4,3,2,6])
)