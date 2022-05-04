/**
 * @param {number} n
 * @return {number}
 */
var binaryGap = function(n) {
	if(n < 5 ) return 0
	const array = n.toString(2).split('');
	let distance = 0;
	let lastIndex = 0;
	for (let index = 1; index < array.length; index++) {
		if(array[index] === '1'){
			distance = Math.max(index - lastIndex,distance);
			lastIndex = index;
		}
	};
	return distance;
};

console.log(
	binaryGap(22)
)