var mongoose = require('mongoose');

var DraftBlogPostSchema = mongoose.Schema({
	author: String,
	dateCreated: Date,
	content: String,
	tags: Array,
	title: String
});

module.exports = mongoose.model('DraftBlogPost', DraftBlogPostSchema);