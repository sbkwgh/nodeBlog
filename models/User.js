//Model for user 
var mongoose = require('mongoose'),
	crypto = require('crypto');
	
var UserSchema = mongoose.Schema({
	username: String,
	password: String,
	salt: String
});

//Generates salt and password hash on document save
UserSchema.pre('save', function(next) {
	var user = this;
	var salt = crypto.randomBytes(128).toString('base64');
	var key = crypto.pbkdf2Sync(user.password, salt, 10000, 512).toString('base64'); 
	this.salt = salt;
	this.password = key;
	next();
});


//Checks password, returning a bool
UserSchema.methods.checkPassword = function(password) {
	var key = crypto.pbkdf2Sync(password, this.salt, 10000, 512).toString('base64');
	return key === this.password;
}


var User = mongoose.model('User', UserSchema);
module.exports = User;