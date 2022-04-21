/**
 * @param {string} sentence
 * @return {string}
 */
 var toGoatLatin = function(sentence) {
	const vowelDict = {
		'a':1,
		'e':1,
		'i':1,
		'o':1,
		'u':1
	};
	return sentence.split(' ').map((word,index) => {
		let newWord
		// 元音为首的单词
		if(vowelDict[word.charAt(0).toLocaleLowerCase()]){
			newWord = word + 'ma';
		}else{
			newWord = word.slice(1) + word.charAt(0) + 'ma';
		}
		return newWord + 'a'.repeat(index + 1);
	}).join(' ');
};