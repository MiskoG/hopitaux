// declare myhosp Namespace
var myhospNS="http://127.0.0.1:3333/";

// Create RDF object
var myRDF = new RDF();

// Create a list of hospitals
var hospitals = [];

// Get RDF
myRDF.getRDFURL('https://rawgit.com/MiskoG/hopitaux/e8d5c1e63af8e6bfb833f754d3af3cff5b802345/data/coordonnees.rdf',locationsCallback);

function locationsCallback() {
	// Returns an array of triples which do have a hospital name
	var hospitalTriples = myRDF.Match(null,null,myhospNS+"HospitalName",null);

	for (var i = 0; i < hospitalTriples.length; i++) {
		var hospLat = myRDF.Match(null,hospitalTriples[i].subject,myhospNS+"latitude",null);
		var hospLng = myRDF.Match(null,hospitalTriples[i].subject,myhospNS+"longitude",null);
		var hospital = {
			latitude: parseFloat(hospLat[0].object),
			longitude: parseFloat(hospLng[0].object),
			name: hospitalTriples[i].object
		};

		hospitals.push(hospital);
	};
}