/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
 var minEatingSpeed = function(piles, h) {
	let left = Math.ceil(piles.reduce((a,b) => a + b) / h);
	let right = Math.max(...piles);
	while(left < right){
			const speed = Math.floor((left + right) / 2);
			const totalTime = piles.reduce((total,pile) => total + Math.ceil(pile / speed),0);
			// 说明速度慢了
			if(totalTime > h ){
					left = speed + 1;
			}else{
					right = speed;
			}
	}
	return left;
};