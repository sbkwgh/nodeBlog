//import controller modules with file loader
var path = require('path'),
	c = require('moduleLoader')(path.join(__dirname, 'controllers'), true);

//routes
module.exports = function(app) {
	app.get('/', c.index.get);

	app.get('/login', c.login.get);
	app.post('/login', c.login.post);
	
	app.get('/createAccount', c.createAccount.get);
	app.post('/createAccount', c.createAccount.post);
	
	app.get('/dash', c.dash.index.get);
	app.post('/dash', c.dash.index.get);
	
	app.get('/dash/add', c.dash.add.get);
	app.post('/dash/add', c.dash.add.post);
	app.get('/tag/:tag', c.tag.get);
};