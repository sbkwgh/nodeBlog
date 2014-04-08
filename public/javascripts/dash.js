$(document).ready(function() {
	//Show success method if ?postSuccess=true is in the url
	var success = location.href.match(/postSuccess=[a-z0-9]+/gi);
	if(success) {
		if(success[0].split("postSuccess=")[1]) {
			var successMessage = $('<div>').append('<strong>Success!</strong> The post has been added to the blog').addClass('success');
			$('body').append(successMessage);
			setTimeout(function() {
				$('.success').fadeOut(2000);
			}, 5000);
		}
	}
});