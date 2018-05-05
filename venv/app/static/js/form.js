$(document).ready(function() {
 $('#form-id').submit(function(event) {
  event.preventDefault();
  $.ajax('/process', {
   data: $(this).serialize(),
   type: 'POST'
  })
  .done(function(data) {
   if (data.error) {
    $('#errorAlert').text(data.error).show();
    $('#successAlert').hide();
   }
   else {
    $('#successAlert').text(data.name).show();
    $('#errorAlert').hide();
   }
  });
 });
});