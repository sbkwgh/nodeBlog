var mongoose = require('mongoose');

var TagsSchema = mongoose.Schema({
	tags: Array
});


module.exports = mongoose.model('Tags', TagsSchema);