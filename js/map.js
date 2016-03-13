var map;
var markers = [];
var imageMarkers = ['./img/marker-none.png','./img/marker-1.png','./img/marker-2.png','./img/marker-3.png'];

function initMap() {
  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.858, lng: 2.32},
    scrollwheel: false,
    zoom: 12
  });
  getMarkersGeneral();
}

// Gets and displays the markers for the GENERAL category
function getMarkersGeneral() {
  deleteMarkers();
  getMarkersByCategory('general');
}

// Gets and displays the markers for the URGENCES category
function getMarkersUrgences() {
  deleteMarkers();
  getMarkersByCategory('urgences');
}

// Gets the list of markers depending on its category : General, Urgences, Maternité or Séjours longs
function getMarkersByCategory(category) {
  if(category == 'general') {
    imageMarker = 2;
  }
  else {
    imageMarker = 1
  }
  for (var i = 0; i < hospitals.length ; i++) {
    var latitude = hospitals[i].latitude;
    var longitude = hospitals[i].longitude;
    addMarker(latitude,longitude,hospitals[i].name,imageMarker);
  };
}

// Adds a marker to the map and pushes it to the array.
function addMarker(latitude,longitude,name,icon) {
  var marker = new google.maps.Marker({
    map: map,
    position: 
      {lat: latitude, 
      lng: longitude},
    title: name,
    icon: imageMarkers[icon]
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  setMapOnAll(null);
  markers = [];
}