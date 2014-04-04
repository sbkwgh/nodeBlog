var mConnect = require('mConnect');

exports.all = function(req, res) {
	if(!req.session.auth) {
		res.location('/login');
		res.send(307, null);
	}
};

exports.get = function(req, res) {
	if(!req.session.test) {
		req.session.test = 1;
	} else {
		req.session.test++;
	}
	res.send(req.session);
};