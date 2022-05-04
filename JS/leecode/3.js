/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function(s) {
	const occ = new Set();
	const len = s.length;
	let rp = -1 , ans = 0;
	for(let i = 0; i < len; i++){
		// 左指针每次向右移动一格
		if(i != 0){
			occ.delete(s.charAt(i - 1)); //删除左指针之前的字符
		}
		while(rp + 1 < len && !occ.has(s[rp + 1])){
			occ.add(s[rp + 1]);
			rp++;
		}
		ans = Math.max(ans,rp - i + 1);
	};
	return ans;
};