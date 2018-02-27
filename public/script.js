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
      // console.log(data, checkbox);

      $("."+rowID).removeClass("completed");
    });
  }
};

$('.big-X').on('click', function(e) {
  e.preventDefault();
  var finishedTask = $(this);
  var rowUrl = finishedTask.attr('href');
  var rowID = rowUrl.slice(8);
  $.ajax({
    method: 'DELETE',
    url: rowUrl
  }).done(function(data) {
    // get data returned from the DELETE route
    console.log(data, rowUrl);
    $("."+rowID).remove();

    // do stuff when the DELETE action is complete
    // teamElement.remove();
  });
});