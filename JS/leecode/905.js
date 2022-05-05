/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var sortArrayByParity = function(nums) {
	let l = 0, r = nums.length - 1;
	while(true){
		while(nums[l] % 2 === 0 && l < nums.length){
			l++;
		};
		while(nums[r] % 2 !== 0 && r > 0){
			r--;
		};
		if(r < l){
			break;
		}
		let temp = nums[l];
		nums[l] = nums[r];
		nums[r] = temp;
		l++;
		r--;
	}
	return nums;
};

console.log(
	sortArrayByParity([3,1,2,4])
)