#### 通过删除字母匹配到字典里最长单词
给你一个字符串 s 和一个字符串数组 dictionary ，找出并返回 dictionary 中最长的字符串，该字符串可以通过删除 s 中的某些字符得到。
如果答案不止一个，返回长度最长且字母序最小的字符串。如果答案不存在，则返回空字符串

示例 1：
输入：s = "abpcplea", dictionary = ["ale","apple","monkey","plea"]
输出："apple"

示例 2：
输入：s = "abpcplea", dictionary = ["a","b","c"]
输出："a"

##### 双指针
看到这道题目首先想到的是通过排序字典的数组，将字符串长度大和字母序小的进行排序，字符串长度比较好比较，而字母序则需要借助字符串的localcompare
进行排序。在进行排序之后，我们只需要找到第一个符合要求的字符串返回即可。
因为题目中是删除某一些字母后就来匹配字符串，所以我们不需要考虑有关s中的顺序的问题，这样问题其实就简单很多了。假设word为我们比较的字符串，我们只需要找word中的顺序下来的匹配到s中的字母的下标是否为word的长度即可,具体代码可以看下文的实现。
```js
/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {string}
 */
 var findLongestWord = function(s, dictionary) {
   let result = ''
  dictionary.sort((a,b) => {
    if(a.length !== b.length){
      return b.length - a.length;
    }else{
      return a.localeCompare(b);
    }
  });
  for(let index = 0; index < dictionary.length; index++){
    let word = dictionary[index]
    let j = 0;
    let i = 0
    while(i < word.length && j < s.length){
      if(word[i] === s[j]){
        i++;
      }
        j++;
    }
    if(i === word.length){
      result = word;
      break;
    }
  }
  return result;
};

```

https://leetcode-cn.com/problems/search-a-2d-matrix-ii/
该题有一种比较巧妙的解题方式就是通过z字的方式查找，因为当遍历这种序列的二位数组时，我们可以从右上角进行入手查找，因为右上角这个值比较特殊，比他的数字都在下方而比他小的数值都在左边，所以如果我们从右上角开始入手查找对应的值的时候，我们只需要关心右上角的值是否比target大，如果比target大，那么我们就需要去掉这一列的数据，如果比target要小，那么这一行的数据都不符合要求。通过以上的方式修改右上角的下标，再次进行判断和查找下一个右上角指导有值和target相等或者列，行中一个被遍历完了。
```js
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
 var searchMatrix = function(matrix, target) {
    let row = 0; // 行
    let col = matrix[0].length - 1; // 列
    let result = false
    while(row < matrix.length && col >= 0){
      if(matrix[row][col] === target){
        result = true;
        break;
      }else if(matrix[row][col] > target){
        col--
      }else{
        row++
      }
    }
    return result
};
```

#### 判断子序列
给定字符串 s 和 t ，判断 s 是否为 t 的子序列。

字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。

进阶：

如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？

示例 1：

输入：s = "abc", t = "ahbgdc"
输出：true
示例 2：

输入：s = "axc", t = "ahbgdc"
输出：false

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
 var isSubsequence = function(s, t) {
  if(s.length > t.length) return false;
  let p1 = p2 = 0;
  while(p1 < s.length && p2 < t.length){
    if(s[p1] === t[p2]){
      p1++;
      p2++;
    }else{
      p2++;
    }
  }
  return p1 === s.length
};

```


#### 验证回文串
给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

说明：本题中，我们将空字符串定义为有效的回文串。

示例 1:

输入: "A man, a plan, a canal: Panama"
输出: true
解释："amanaplanacanalpanama" 是回文串
示例 2:

输入: "race a car"
输出: false
解释："raceacar" 不是回文串

```js

/**
 * @param {string} s
 * @return {boolean}
 */
 var isPalindrome = function(s) {
   s = s.toLocaleLowerCase()
   let l = 0, r = s.length - 1;
   while(l < r){
    let w1 = s[l],w2 = s[r];
    if(!isValid(w1)){
      l++;
      continue;
    }
    if(!isValid(w2)){
      r--;
      continue;
    }
    if(w1 !== w2){
      return false
    }
    l++;
    r--;
   }
   return true;
};
var isValid = function(str){
  return (str >= 'a' && str <= 'z') || (str >= '0' && str <= '9');
}
```