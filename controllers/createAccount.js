var User = require('../models/User.js'),
	mConnect = require('mConnect');

exports.get = function(req, res) {
	mConnect(function(mongoose) {
		User.findOne(function(err, user) {
			mongoose.disconnect();
			//If user document exists redirect to login
			if(user) {
				res.redirect('/login');
			} else {
				//Otherwise render create account page
				res.render('createAccount/get.jade', {
					title: 'Create account',
					page: 'createAccountLogin'
				});
			}
		});
	});
};

exports.post = function(req, res) {
	var contains = function(str, regexp) {
		for(var i = 0; i < regexp.length; ++i) {
			if(!str.match(regexp[i])) {
				return false;
			}
		}
		return true;
	};
	mConnect(function(mongoose) {
		var errors = [];
		if(req.body.username.length < 6) {
			errors.push('Username must be longer than 6 characters')
		}
		if(req.body.username.length > 32) {
			errors.push('Username must not be longer than 32 characters')
		}
		if(req.body.password.length < 9) {
			errors.push('Password must be longer than 9 character');
		}
		if(req.body.password.length > 64) {
			errors.push('Password must not be longer than 64 character');
		}
		if(req.body.password !== req.body.confirmPassword) {
			errors.push('Passwords must be the same');
		}
		if(!contains(req.body.password, [/[a-z]/, /[A-Z]/, /[0-9]/])) {
			errors.push('Password must contain numbers, and upper and lower case letters');
		}
		if(errors.length > 0) {
			mongoose.disconnect();
			res.render('createAccount/post.jade', {
				title: 'Create account | Errors in creating account',
				page: 'createAccountLogin',
				error: errors
			});
		} else {
            var newUser = User({
                username: req.body.username,
                password: req.body.password
            });
            newUser.save(function(err) {
				mongoose.disconnect();
                req.session.auth = true;
                req.session.username = req.body.username;
                res.redirect('/dash');
            });
        }
	});
};