var mConnect = require('mConnect');

exports.get = function(req, res) {
	res.render('dash/get.jade', {
		title: 'Dashboard',
		page: 'dash',
	});
};