// https://leetcode-cn.com/problems/reverse-only-letters/
/**
 * @param {string} s
 * @return {string}
 */
 var reverseOnlyLetters = function(s) {
  const reg = new RegExp("[A-Za-z]") // 是否为字母的正则表达式
  function isLetter(char){
    return reg.test(char);
  }
 
  let left = 0,right = s.length - 1;
  const arr = [...s];
  while(left < right){
    const codeL = arr[left];
    const codeR = arr[right];
    if(!isLetter(codeL)){
      left++;
    }else if(!isLetter(codeR)){
      right--;
    }else{
      let temp = codeL;
      arr[left] = arr[right];
      arr[right] = temp;
      left++;
      right--;
    }
  }
  return arr.join("");
};

// 精简后的双指针
var reverseOnlyLetters = function(s) {
  const n = s.length;
  const arr = [...s];
  let left = 0, right = n - 1;
  while (true) {
      while (left < right && !(/^[a-zA-Z]+$/.test(s[left]))) { // 判断左边是否扫描到字母
          left++;
      }
      while (right > left && !(/^[a-zA-Z]+$/.test(s[right]))) { // 判断右边是否扫描到字母
          right--;
      }
      if (left >= right) {
          break;
      }
      swap(arr, left, right);
      left++;
      right--;
  }
  return arr.join('');
};

const swap = (arr, left, right) => {
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
}