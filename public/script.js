// function handleChange(checkbox) {
//     if(checkbox.checked == true){
//         document.getElementById("submit").removeAttribute("disabled");
//     }else{
//         document.getElementById("submit").setAttribute("disabled", "disabled");
//    }
// }

function handleChange(checkbox){
  console.log(checkbox);
  // e.preventDefault();
  // var currentRow = this;
  var rowUrl = checkbox.dataset.url;
  console.log(rowUrl, "##############")
  // var rowData = checkbox.serialize();
  if(checkbox.checked == true){
    $.ajax({
      method: 'PUT',
      url: rowUrl,
      data: true
    }).done(function(data) {
      // get data returned from the PUT route
      console.log(data);

      // do stuff when the PUT action is complete
      // currentRow.remove();

      // or, you can redirect to another page
      // window.location = '/teams';
    });
  }else{
    $.ajax({
      method: 'PUT',
      url: rowUrl,
      data: false
    }).done(function(data) {
      // get data returned from the PUT route
      console.log(data);

      // do stuff when the PUT action is complete
      // currentRow.remove();

      // or, you can redirect to another page
      // window.location = '/teams';
    });
  }
};