 // var locations = [
 //          ['<h3>Bay of Islands</h3>' +
 //            '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>', 55.731250, 37.569662, 5],
 //          ['<h3>Whangarei</h3>' +
 //            '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>', 55.796482, 37.562452, 4],
 //          ['<h3>Mangawhai Heads</h3>' +
 //            '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>', 55.786037, 37.688795, 3],
 //          ['<h3>Auckland Hussies</h3>' +
 //            '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>', 55.739386, 37.720724, 2],
 //          ['<h3>Auckland</h3>' +
 //            '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>', 55.702567, 37.676092, 1]
 //        ];
var script_url = "https://script.google.com/macros/s/AKfycbzkmbNVbRsqNHjCe_y010sAjY0eAQZbbf2eOyFeEw3fwM4EjaZ9/exec";
// var url = script_url+"?callback=ctrlq&delivery_type="+delivery_type+"&company_adress="+company_adress+"&company="+company+"&contact_person="+contact_person+"&contact_phone="+contact_phone+"&date="+date+"&action=insert";
var url = script_url+"?action=read";
var locations = [];
$.getJSON(url, function (json) {
  $.each(json.records, function(key, data){
    var today = new Date()
      var day = data.date.slice(0,10)
      today.setDate(today.getDate() - 1);
      today.toISOString().slice(0,10)
      console.log(today.toISOString().slice(0,10))
      console.log(day)
      if (today.toISOString().slice(0,10) == day){
        var adress = data.company_adress;
        var lat = ''
        var lng = ''
        $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + adress + "&key=AIzaSyByRgW0H_ADWMElmHZ5hZnZKTl31CyOW80", function (json1) {
          // console.log(json1.results)
          lat =  json1.results[0].geometry.location.lat;
          lng = json1.results[0].geometry.location.lng; 
        var company = data.company;
        var arr = ["<h3>" + company + "</h3>", lat, lng];
        locations.push(arr)
        console.log(arr); 
        console.log(locations)  
        }).fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
      });
    }
  })
});

function initMap(){
    var AutoCenter=function() {
        var bounds = new google.maps.LatLngBounds();
        markers.forEach(function(mkr){
            bounds.extend(mkr.position);
        });
        map.fitBounds(bounds);
    }

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: new google.maps.LatLng(55.7518014, 37.5325899),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;
    var markers = [];

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        content:locations[i][0],
        map: map
      });
      markers.push( marker );

      google.maps.event.addListener( marker, 'click', function(event) {
          infowindow.setContent( this.content );
          infowindow.open( map, this );
      }.bind( marker ) );
    }
    AutoCenter();
    // initAutocomplete();
}
