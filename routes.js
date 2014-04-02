//import controller modules with file loader
var c = require('./controllers');

//routes
module.exports = function(app) {
	app.get('/login', c.login.get);
};