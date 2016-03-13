var map;
var markers = [];
var imageMarkers = ['./img/marker-noneb.png','./img/marker-1b.png','./img/marker-2b.png','./img/marker-3b.png'];

function initMap() {
  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.858, lng: 2.32},
    scrollwheel: false,
    zoom: 13
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

// Gets and displays the markers for the MATERNITE category
function getMarkersMaternite() {
  deleteMarkers();
  getMarkersByCategory('maternite');
}

// Gets and displays the markers for the CHIRURGIE category
function getMarkersChirurgie() {
  deleteMarkers();
  getMarkersByCategory('chirurgie');
}

// Gets the list of markers depending on its category : General, Urgences, Maternité or Séjours longs
function getMarkersByCategory(category) {
  for (var i = 0; i < hospitals.length ; i++) {
    var latitude = hospitals[i].latitude;
    var longitude = hospitals[i].longitude;

    if(category == 'urgences') {
      imageMarker = hospitals[i].indiceUrg;
    }
    else if (category == 'maternite') {
      imageMarker = hospitals[i].indiceMater;
    }
    else if (category == 'chirurgie') {
      imageMarker = hospitals[i].indiceChir;
    }
    else {
      imageMarker = 2;
    }
    addMarker(latitude,longitude,hospitals[i].name,imageMarker);
  };

  console.log(hospitals);
}

// Adds a marker to the map and pushes it to the array.
function addMarker(latitude,longitude,name,icon) {

  var contentString = '<div id="content">'+
      '<h1 id="firstHeading" class="firstHeading">'+ name +'</h1>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    map: map,
    position: 
      {lat: latitude, 
      lng: longitude},
    title: name,
    icon: imageMarkers[icon]
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
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