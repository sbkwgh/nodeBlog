//import controller modules with file loader
var c = require('./controllers');

//routes
module.exports = function(app) {
	app.get('/login', c.login.get);
	app.post('/login', c.login.post);
	
	app.get('/createAccount', c.createAccount.get);
	app.post('/createAccount', c.createAccount.post);
	
	app.get('/dash', c.dash.get);
	app.post('/dash', c.dash.get);
};