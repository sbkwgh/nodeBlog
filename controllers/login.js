var mConnect = require('mConnect'),
	User = require('../models/User.js');

exports.get = function(req, res) {
	mConnect(function(mongoose) {
		User.findOne(function(err, user) {
			mongoose.disconnect();
			//If user is logged in, take them to the dash board
			if(req.session.auth) {
				res.location('/dash');
				res.send(307, null);
			}
			//If user document doesn't exist redirect to createAccount
			if(!user) {
				res.location('/createAccount');
				res.send(307, null);
			} else {
				//Otherwise render login page
				res.render('login/get.jade', {
					title: 'Login',
					page: 'createAccountLogin'
				});
			}
		});
	});
};

exports.post = function(req, res) {
	//Render an error page if password/username combo incorrect
	var renderError = function() {
		res.render('login/post.jade', {
			title: 'Login | Incorrect username or password',
			page: 'createAccountLogin',
			error: 'Error, incorrect username or password'
		});
	};

	mConnect(function(mongoose) {
		User.findOne({username: req.body.username}, function(err, user) {
			mongoose.disconnect();
			if(!user) {
				renderError();
			} else {
				if(user.checkPassword(req.body.password)) {
					//Add auth session cookie, redirect to dash page
					req.session.auth = true;
					res.location('/dash');
					res.send(307, null);
				} else {
					renderError();
				}
			}
		});
	});
};