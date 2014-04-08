var BlogPost = require('../models/BlogPost'),
	marked = require('marked'),
	mConnect = require('mConnect');

exports.get = function(req, res) {
	mConnect(function(mongoose) {
		BlogPost.find({}).sort('date').exec(function(err, blogPost) {
			mongoose.disconnect();
			res.render('index.jade', {
				title: 'Home',
				page: 'index',
				md: marked,
				posts: blogPost
			});
		});
	});
};