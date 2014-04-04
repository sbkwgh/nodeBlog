var mongoose = require('mongoose');

var BlogPostSchema = mongoose.Schema({
	author: String,
	dateCreated: Timestamp,
	content: String,
	tags: Array,
	title: String
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);