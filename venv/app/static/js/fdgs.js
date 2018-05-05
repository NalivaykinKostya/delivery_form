/* 
### Copyright 2017 Snyder Group Inc.
### MIT License
### Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: 
### The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
### THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function submit_form() {    
	// Check Fields
    var complete = true;
	var error_color = '#FFD9D9';
    var fields = ['delivery_type', 'company_adress', 'company', 'contact_person', 'contact_phone', 'date'];
    var row = '';
   //  var i;
   //  for(i=0; i < fields.length; ++i) {
   //      var field = fields[i];
   //      $('#'+field).css('backgroundColor', 'inherit');
   //      var value = $('#'+field).val();       
	  //   // Validate Field
   //      if(!value) {
   //          if(field != 'message') {
   //              $('#'+field).css('backgroundColor', error_color);
   //              var complete = false;
   //          }
   //          } else {            
			// // Sheet Data
   //          row += '"'+value+'",';
   //      }
   //  }
   
    // Submission
    if(complete) {		
		// Clean Row
		row = row.slice(0, -1);		
        // Config
        var gs_sid = '1-DAsvjvjzTaVBRF5jiTFSxtzPAQQ2mvLVpd0AbEgy78'; // Enter your Google Sheet ID here
        var gs_clid = '6380402191-jqh5gfvn2oh3urja7smeeuo74pfduffl.apps.googleusercontent.com'; // Enter your API Client ID here
        var gs_clis = 'n9PJJNA3UXjgygKrh0qx_3AB'; // Enter your API Client Secret here
        var gs_rtok = ''; // Enter your OAuth Refresh Token here
        var gs_atok = false;
        var gs_url = 'https://sheets.googleapis.com/v4/spreadsheets/'+gs_sid+'/values/A1:append?includeValuesInResponse=false&insertDataOption=INSERT_ROWS&responseDateTimeRenderOption=SERIAL_NUMBER&responseValueRenderOption=FORMATTED_VALUE&valueInputOption=USER_ENTERED';
        var gs_body = '{"majorDimension":"ROWS", "values":[['+row+']]}';        
         // HTTP Request Token Refresh
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://www.googleapis.com/oauth2/v4/token?client_id='+gs_clid+'&client_secret='+gs_clis+'&refresh_token='+gs_rtok+'&grant_type=refresh_token');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {            
            var response = JSON.parse(xhr.responseText);
            var gs_atok = response.access_token;            
			// HTTP Request Append Data
            if(gs_atok) {
                var xxhr = new XMLHttpRequest();
                xxhr.open('POST', gs_url);
                xxhr.setRequestHeader('Content-length', gs_body.length);
                xxhr.setRequestHeader('Content-type', 'application/json');
                xxhr.setRequestHeader('Authorization', 'OAuth ' + gs_atok );
                xxhr.onload = function() {
					if(xxhr.status == 200) {
						// Success
						$('#message').html('<p>Row Added to Sheet | <a href="http://snydergroupinc.com/tutorials/tutorial-google-sheets-api.php">Add Another &raquo;</a></p><p>Response:<br/>'+xxhr.responseText+'</p>');
						} else {
						// Fail
						$('#message').html('<p>Row Not Added</p><p>Response:<br/>'+xxhr.responseText+'</p>');
					}
                };
                xxhr.send(gs_body);
            }            
        };
        xhr.send();
    }
}