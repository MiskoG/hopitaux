// set up the map
var map = new L.Map('map');

// create the tile layer with correct attribution
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osm = new L.TileLayer(osmUrl, {minZoom: 11, maxZoom: 19});

// start the map
map.setView(new L.LatLng(48.858, 2.32),13);
map.addLayer(osm);