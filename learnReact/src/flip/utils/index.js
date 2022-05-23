// 计算first和last的位置以及大小的差距
export function calculateInvert(firstRect,lastRect){
	const invert = {};
	invert.left = firstRect.left - lastRect.left;
	invert.scalX = (firstRect.width - lastRect.width) / lastRect.width + 1;
	invert.scalY = (firstRect.height - lastRect.height) / lastRect.height + 1;
	invert.top = firstRect.top - lastRect.top;
	return invert
}