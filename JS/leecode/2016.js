/**
 * @param {number[]} nums
 * @return {number}
 */

// [7,1,5,4]
// {1:1, 5:2, 4:3,7:0}
//
 var maximumDifference = function(nums) {
  let res = -1;
  let min = nums[0];
  for(let i = 1; i < nums.length; i++){
    if(nums[i] > min){
      res = Math.max(res, nums[i] - min);
    }else{
      min = nums[i];
    }
  }
  return res;
};
