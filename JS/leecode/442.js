/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var findDuplicates = function(nums) {
  const n = nums.length;
  const ans = [];
  for (let i = 0; i < n; ++i) {
      const x = Math.abs(nums[i]);
      if (nums[x - 1] > 0) {
          nums[x - 1] = -nums[x - 1];
      } else {
          ans.push(x);
      }
  }
  return ans;
};

findDuplicates(
	[4,3,2,7,8,2,3,1]
)