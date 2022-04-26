// https://leetcode-cn.com/problems/diving-board-lcci/
/**
 * @param {number} shorter
 * @param {number} longer
 * @param {number} k
 * @return {number[]}
 */
var divingBoard = function(shorter, longer, k) {
	if(k === 0) return [];
	if(shorter === longer) return [k * shorter];
	const answer = [];
	for(let i = 0; i <= k; i++){
		const shortCount = k - i;
		answer.push(shortCount * shorter + longer * i);
	};
	return answer;
};