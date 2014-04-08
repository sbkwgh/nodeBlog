var BlogPost = require('../../models/BlogPost.js'),
	User = require('../../models/User.js')
	mConnect = require('mConnect');

exports.get = function(req, res) {
	res.render('dash/add/get.jade', {
		title: 'Add post',
		page: 'add'
	});
};

exports.post = function(req, res) {
	var errors = [];
	if(!req.body.title.length) {
		error.push('Post title must not be empty');
	}
	if(!req.body.content.length) {
		error.push('Post content must not be empty');
	}
	if(errors.length) {
		res.render('dash/add/post.jade', {
			title: 'Add post | Errors in adding post',
			page: 'add',
			error: errors
		});
	} else {
		mConnect(function(mongoose) {
			var postTags = req.body.tags;
			if(postTags) {
				postTags = postTags.split(',');
			} else {
				postTags = [];
			}
			User.findOne(function(err, user) {
				var newPost = new BlogPost({
					author: user.username,
					dateCreated: new Date(),
					content: req.body.content,
					title: req.body.title,
					tags: postTags
				});
				newPost.save(function(err) {
					mongoose.disconnect();
					res.location('/dash?postSuccess=true');
					res.send(307, null);
				});
			});
		});
	}
};