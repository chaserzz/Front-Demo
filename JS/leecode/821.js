/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
 var shortestToChar = function(s, c) {
	const len = s.length;
	const array = new Array(s.length).fill(s.length);
	for(let i = 0,idx = -len; i < len; i++){
		if(s[i] === c){
			idx = i;
		}
		array[i] = i - idx;
	}
	for(let i = len - 1,idx = 2 * len;i >= 0; i--){
		if(s[i] === c){
			idx = i;
		}
		array[i] = Math.min(array[i], idx - i);
	}
	return array
 };
 