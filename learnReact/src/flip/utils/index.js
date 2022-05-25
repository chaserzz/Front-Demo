// 计算first和last的位置以及大小的差距
export function calculateInvert(firstRect,lastRect){
	const invert = {};
	invert.scalX = firstRect.width  / lastRect.width;
	invert.scalY = firstRect.height / lastRect.height;
	const width =  lastRect.width * (invert.scalX - 1) / 2;
	const height = lastRect.height * (invert.scalY - 1) / 2 ;
	invert.left = (firstRect.left - lastRect.left + width);
	invert.top = (firstRect.top - lastRect.top + height) ;
	return invert
}