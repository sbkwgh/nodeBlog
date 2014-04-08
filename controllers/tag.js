var mConnect = require('mConnect'),
	BlogPost = require('../models/BlogPost.js'),
	marked = require('marked');

exports.get = function(req, res) {
	var tag = req.param('tag');
	mConnect(function(mongoose) {
		BlogPost.find({}).where('tags').in([tag]).exec(function(err, blogPost) {
			mongoose.disconnect();
			res.render('index.jade', {
				title: 'Blog posts matching tag: \'' + tag + '\'',
				page: 'index',
				md: marked,
				posts: blogPost
			});
		});
	});
};