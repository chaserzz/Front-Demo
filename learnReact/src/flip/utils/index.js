// 计算first和last的位置以及大小的差距
export function calculateInvert(firstRect,lastRect){
	const invert = {};
	invert.scalX = firstRect.width  / lastRect.width;
	invert.scalY = firstRect.height / lastRect.height;
	const width = invert.scalX * lastRect.width / 2 * (invert.scalX > 1 ? 1 : -1);
	const height = invert.scalY * lastRect.height / 2 * (invert.scalY > 1 ? 1 : -1);
	console.log('first',firstRect,'last',lastRect,'width',width,'height',height);
	invert.left = (firstRect.left - lastRect.left + width);
	invert.top = (firstRect.top - lastRect.top + height) ;
	console.log('invert',invert)
	return invert
}