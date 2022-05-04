
/**
 * @param {string} input
 * @return {number}
 */
 var lengthLongestPath = function(input) {
	const inputs = input.split('\n');
	const step = [];// 用于存储当前层数的文件名称
	let count = 0;
	for(let i = 0; i < inputs.length; i++){
		const str = inputs[i]; //获得当前分割的字符串
		const level = str.match(/\t/g)?.length || 0; // 根据/t数量
		step[level] = str.slice(level);// 保存当前的文件名称
		// 当前字符串表示的是一个文件
		if(str.includes('.')){
			count = Math.max(count, step.slice(0,level + 1).join('/').length);
		}
	}
	return count;
 };