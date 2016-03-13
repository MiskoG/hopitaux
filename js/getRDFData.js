// declare myhosp Namespace
var myhospNS="http://127.0.0.1:3333/";

// Create RDF object
var myRDF = new RDF();
var myRDF2 = new RDF();

// Create a list of hospitals
var hospitals = [];

// Get RDF
myRDF.getRDFURL('https://rawgit.com/MiskoG/hopitaux/e8d5c1e63af8e6bfb833f754d3af3cff5b802345/data/coordonnees.rdf',locationsCallback);

function locationsCallback() {
	// Now we can load the other RDF model to get the indicators
	myRDF2.getRDFURL('https://rawgit.com/MiskoG/hopitaux/e8d5c1e63af8e6bfb833f754d3af3cff5b802345/data/indicateurs.rdf',indicatorsCallback);
}

function indicatorsCallback() {
	// Returns an array of triples which do have a hospital name
	var hospitalTriples = myRDF.Match(null,null,myhospNS+"HospitalName",null);

	for (var i = 0; i < hospitalTriples.length; i++) {
		var hospLat = myRDF.Match(null,hospitalTriples[i].subject,myhospNS+"latitude",null);
		var hospLng = myRDF.Match(null,hospitalTriples[i].subject,myhospNS+"longitude",null);

		var hospUrg = myRDF2.Match(null,hospitalTriples[i].subject,myhospNS+"UrgencesIndice",null);
		var hospChir = myRDF2.Match(null,hospitalTriples[i].subject,myhospNS+"ChirurgieIndice",null);
		var hospMater = myRDF2.Match(null,hospitalTriples[i].subject,myhospNS+"MaterniteIndice",null);

		var hospital = {
			latitude: parseFloat(hospLat[0].object),
			longitude: parseFloat(hospLng[0].object),
			name: hospitalTriples[i].object,
			indiceUrg: codeCouleurUrgences(parseFloat(hospUrg[0].object)),
			indiceChir: codeCouleurChirurgie(parseFloat(hospChir[0].object)),
			indiceMater: codeCouleurMaternite(parseFloat(hospMater[0].object))
		};
		hospitals.push(hospital);
	};
}

function codeCouleurUrgences(indice) {
	var indiceCouleur;

	if(indice == 0) {
		indiceCouleur = 0;
	}
	else if (indice > 0 && indice < 10) {
		indiceCouleur = 1;
	}
	else if (indice >= 10 && indice < 20) {
		indiceCouleur = 2;
	}
	else if (indice >= 20) {
		indiceCouleur = 3;
	}
	else {
		indiceCouleur = 0;
	}

	return indiceCouleur;
}

function codeCouleurChirurgie(indice) {
	var indiceCouleur;

	if(indice == 0) {
		indiceCouleur = 0;
	}
	else if (indice > 0 && indice < 0.8) {
		indiceCouleur = 1;
	}
	else if (indice >= 0.8 && indice < 0.99) {
		indiceCouleur = 2;
	}
	else if (indice >= 0.99) {
		indiceCouleur = 3;
	}
	else {
		indiceCouleur = 0;
	}

	return indiceCouleur;
}

function codeCouleurMaternite(indice) {
	var indiceCouleur;

	if(indice == 0) {
		indiceCouleur = 0;
	}
	else if (indice > 0 && indice < 0.75) {
		indiceCouleur = 1;
	}
	else if (indice >= 0.75 && indice < 0.99) {
		indiceCouleur = 2;
	}
	else if (indice >= 0.99) {
		indiceCouleur = 3;
	}
	else {
		indiceCouleur = 0;
	}

	return indiceCouleur;
}