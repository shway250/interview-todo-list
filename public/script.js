//edit the done click box
function handleChange(checkbox){
  var rowUrl = checkbox.dataset.url;
  var rowID = rowUrl.slice(6);
  if(checkbox.checked == true){
    $.ajax({
      method: 'PUT',
      url: rowUrl,
      data: {"checked": true}
    }).done(function(data) {
      // console.log(data, checkbox);
      $("."+rowID).addClass("completed");
    });
  }else{
    $.ajax({
      method: 'PUT',
      url: rowUrl,
      data: {"checked": false}
    }).done(function(data) {
      $("."+rowID).removeClass("completed");
    });
  }
};

//delete link
$('.big-X').on('click', function(e) {
  e.preventDefault();
  var finishedTask = $(this);
  var rowUrl = finishedTask.attr('href');
  var rowID = rowUrl.slice(8);
  $.ajax({
    method: 'DELETE',
    url: rowUrl
  }).done(function(data) {
    $("."+rowID).remove();
  });
});

//edit task description
$('body').on('click', '[data-editable]', function(){
  var $el = $(this);         
  var $input = $('<input/>').val($el.text());
  $el.replaceWith( $input );
  var rowUrl = "/edittext/"+$el[0].dataset.row;
  
  var save = function(){
    var $p = $('<p data-editable />').text( $input.val() );
    $input.replaceWith( $p );
    var newTask = $input.val();
    // doing the AJAX call
    $.ajax({
      method: 'PUT',
      url: rowUrl,
      data: {"newTask": newTask}
    }).done(function(data) {
      //add actions here later if need be
    });
  };
  $input.one('blur', save).focus();  
});