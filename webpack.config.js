const path = require('path');

module.exports = {
	mode: 'development',
	entry: 'C:/Users/Ivan/Documents/GitHub/GitHubFinder/src/js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js'
	}
};