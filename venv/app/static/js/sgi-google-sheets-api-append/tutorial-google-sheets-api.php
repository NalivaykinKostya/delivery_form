<!--
### Copyright 2017 Snyder Group Inc.
### MIT License
### Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: 
### The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
### THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
-->
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width"/>
<title>Snyder Group Inc | Tutorial</title>
<link rel="stylesheet" type="text/css" href="style.css" media="screen"/>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="fdgs.js"></script>
</head>
<body>

<!-- Header -->
<div class="header_container">
<div class="header">
<img src="logo.png" class="header_logo"/>
</div>
</div>
<!-- Header -->

<!-- Content -->
<div class="content_container">
<div class="content">
<div class="content_full content_twelve">
<div class="container_text">
<h1>Google Sheets API</h1>
<h3>Add HTML Form Data to Sheet via Javascript</h3>
</div>
<!-- Form -->
<div class="form_container">
<form id="sheets" name="sheets" class="form_body">
<input id="first_name" name="last_name" class="form_field" value="" placeholder="First Name"/>
<input id="last_name" name="last_name" class="form_field" value="" placeholder="Last Name"/>
<input id="email" name="email" class="form_field" value="" placeholder="Email Address"/>
<input id="submit" name="submit" type="button" class="form_button" value="Submit" onClick="submit_form()">
</form>
<div class="form_message" id="message"></div>
</div>
<!-- Form -->
</div>
</div>
</div>
<!-- Content -->

<!-- Footer -->
<div class="footer_container">
<div class="footer">
<div class="footer_text">
<h3><a href="http://www.snydergroupinc.com" target="_blank">SnyderGroupInc.com</a></h3>
Copyright &copy; 2017 Snyder Group Inc. - All Right Reserved
</div>
</div>
</div>
<!-- Footer -->

</body>
</html>