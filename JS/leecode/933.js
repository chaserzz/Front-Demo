var RecentCounter = function() {
	this.array = [];
	return this;
};

/** 
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function(t) {
	this.array.push(t);
	while (this.array[0] < t - 3000) {
			this.array.shift();
	}
	return this.array.length;
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
 var obj = new RecentCounter()
 var param_1 = obj.ping(1)
 console.log(param_1)