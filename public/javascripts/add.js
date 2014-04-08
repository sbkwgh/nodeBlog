$(document).ready(function() {
  $('#tagBar').on('keydown', '.addTag', function(e) {
    var inputVal = $(this).val();
    //Add tag for space, enter key and comma
    if((e.which === 13 || e.which === 32 || e.which === 188) && inputVal) {
      //Add tag if it is not already added
      if($('#hiddenTags').val().split(',').indexOf(inputVal) === -1) {
        //Add new tags to hiddenTags input field, delimited by a comma
        if(!$('#hiddenTags').val()) {
           $('#hiddenTags').val(inputVal);
        } else {
          $('#hiddenTags').val($('#hiddenTags').val() + ',' + inputVal);
        }
        //Remove the input field then append it to the end of the tagBar
        $('#tagBar').append('<div class="tag">' + inputVal + '<div class="delete">x</div></div>');
        $('.addTag')
          .addClass('remove')
          .clone()
          .removeClass('remove')
          .appendTo('#tagBar');
        $('.remove').remove();
      }
      //Automatically focus input field for quick adding of tags
      $('.addTag').val('').focus();
      return false;
    }

  });
  //Delete tag on click of the 'x'
  $('#tagBar').on('click', '.delete', function() {
	//Remove deleted tag from hiddenTags field
	var tags = $('#hiddenTags').val().split(',');
	var index = tags.indexOf($(this).val());
	tags.splice(index, 1);
	$('#hiddenTags').val(tags.join(','));
    $(this).parent().remove();
  });
});