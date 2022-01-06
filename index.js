/**
 * @param {string} s
 * @return {boolean}
 */
 var isPalindrome = function(s) {
   s = s.toLocaleLowerCase()
   let l = 0, r = s.length - 1;
   while(l < r){
    let w1 = s[l],w2 = s[r];
    console.log(w1,w2)
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

const result = isPalindrome(
  "",
)
console.log(result)
