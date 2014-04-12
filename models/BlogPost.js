var mongoose = require('mongoose');

var BlogPostSchema = mongoose.Schema({
	_id: ObjectId,
	author: String,
	dateCreated: Date,
	content: String,
	tags: Array,
	title: String
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);