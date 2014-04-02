var fs = require('fs'),
	path = require('path'),
	modules = {};
fs.readdirSync(__dirname).forEach(function(file) {
	if(file != 'index.js') {
		var fileName = path.basename(file, '.js');
		modules[fileName] = {};
		modules[fileName] = require('./' + file);
	}
});

module.exports = modules;