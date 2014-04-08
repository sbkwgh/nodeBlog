exports.get = function(req, res, errorCode, errorMessage) {
	if(!errorMessage) {
		switch(errorCode) {
			case 404:
				errorMessage = 'Unfortunately we couldn\'t find the page you requested (' + req.originalUrl + '). ';
				errorMessage+= 'It could have been deleted, or you might have mis-typed the URL. In any case, we are sending our finest code-monkeys to fix this problem';
				break;
			default:
				errorMessage = 'Something went wrong on our side, sorry about that. Try again a bit later and see if it works then.';
		}
	}
	res.status(errorCode)
	res.render('errorPages.jade', {
		title: 'Error - ' + errorCode,
		message: errorMessage
	});
};