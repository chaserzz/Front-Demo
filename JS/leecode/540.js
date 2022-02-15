/* 给你一个仅由整数组成的有序数组，其中每个元素都会出现两次，唯有一个数只会出现一次。

请你找出并返回只出现一次的那个数。
你设计的解决方案必须满足 O(log n) 时间复杂度和 O(1) 空间复杂度。

示例 1:
输入: nums = [1,1,2,3,3,4,4,7,8,8]
             1,0,1,0,1,0,1,0,1,0
输出: 2

示例 2:
输入: nums =  [3,3,7,7,10,11,11]
输出: 10
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
 var singleNonDuplicate = function(nums) {
  let start = 0, end = nums.length - 1;
  while(start < end){
    const mid = Math.floor((end - start) / 2) + end // 防止计算middle指针时超出最大值
    // 如果mid是奇数，则应该对应mid与mid-1的值是否相等，因为如果相等，则说明我们要找的唯一的值>mid
    // 如果mid是偶数，应该对应mid与mid+1;
    if(nums[mid] === nums[(mid ^ 1)]){
      start = mid + 1;
    }else{
      end = mid; // 否则的话需要将右侧的数值缩小，我们要找的下标应该在
    }
  }
  return nums[start];
};

console.log(
singleNonDuplicate([3,3,7,7,11,11,10,])
)