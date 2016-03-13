function initMap() {

  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.858, lng: 2.32},
    scrollwheel: false,
    zoom: 12
  });

  // Let's initialize the hospitals data
  var hospitals = JSON.parse(hospitalsJSON);

  var imageMarkers = ['./img/marker-none.png','./img/marker-1.png','./img/marker-2.png','./img/marker-3.png'];

  for (var i = 0; i < hospitals.length ; i++) {
  	var j = i%4;
  	// Create a marker and set its position.
	var marker = new google.maps.Marker({
		map: map,
		position: 
			{lat: parseFloat(hospitals[i].latitude), 
			lng: parseFloat(hospitals[i].longitude)},
		title: hospitals[i].name,
		icon: imageMarkers[j]
	});
  };
}