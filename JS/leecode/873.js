/**
 * @param {number[]} A
 * @return {number}
 */
 var lenLongestFibSubseq = function (A) {
	const dict = {};
	for(let i = 0; i < A.length; i++){
		dict[A[i]] = i;
	}
	const dp = new Array(A.length).fill(0).map(_ => new Array(A.length).fill(2)); // 斐波那契数列初始化
	let max = 0;
	for(let second = 0; second < A.length - 1; second++){
		for(let third = second + 1; third < A.length; third++){
			const num2 = A[second];
			const sum = A[third];
			const num1 = sum - num2;
			// 斐波那契数列特征，且具有num1
			if(num1 < num2 && dict[num1] >= 0){
				//更新second,third的数列长度
				dp[second][third] = Math.max(dp[dict[num1]][second] + 1, dp[second][third]);
				max = Math.max(max,dp[second][third]);
			}
		}
	}
	return max;
};

console.log(
	lenLongestFibSubseq(
	[1,2,3,4,5,6,7,8])
)