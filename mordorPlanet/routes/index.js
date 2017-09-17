var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;

var url= "mongodb://localhost:27017/mordorPlanet";



function getStateWorld(callback){
	mongodb.connect(url, (err, db)=>{
		if(err) throw err;
		var estado = db.collection("estado");

		estado.find({}).toArray(function(err, estado){
			if(err) throw err;
			console.log("proxi!");
			callback(estado);
		});
	});
}

router.get('/estado', function(req, res) {
	getStateWorld((state)=>{
		res.json(state);
	});
});


router.get("")


module.exports = router;
