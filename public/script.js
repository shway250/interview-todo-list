function handleChange(checkbox){
  var rowUrl = checkbox.dataset.url;
  if(checkbox.checked == true){
    $.ajax({
      method: 'PUT',
      url: rowUrl,
      data: {"checked": true}
    }).done(function(data) {
      // get data returned from the PUT route
      console.log(data);

      // do stuff when the PUT action is complete
      // currentRow.remove();
    });
  }else{
    $.ajax({
      method: 'PUT',
      url: rowUrl,
      data: {"checked": false}
    }).done(function(data) {
      console.log(data);

      // do stuff when the PUT action is complete
      // currentRow.remove();
    });
  }
};