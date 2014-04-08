//modules
var express = require('express'),
	path = require('path'),
	errorPages = require('./controllers/errorPages.js');

//start express
var app = express();

// set-up environment
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('secret code...'));
app.use(express.session());
//Redirect to login for all requests if user is not logged in at /dash
app.use('/dash', function(req, res, next) {
	if(!req.session.auth) {
		res.location('/login');
		res.send(307, null);
	}
	next();		
});
app.use(app.router);
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
//Add 404 page for unknown routes
app.use(function(req, res, next){
    errorPages.get(req, res, 404);
});

//start routes from routes.js file
require('./routes')(app);


app.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
