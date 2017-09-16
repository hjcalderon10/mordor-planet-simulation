var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');


function getTweets(callback){

}


/* GET home page. */
router.get('/tweets', function(req, res) {


	getTeewts((tweets)=>{
		res.json(tweets);
	});
});

module.exports = router;
