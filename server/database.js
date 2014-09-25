var mongodb = require('mongodb');

module.exports = function (config) {
	var theDb = null;

	// mongodb supports connection pooling, so creating a connection 
	// to the server and keeping it open is the preferred approach
	// to utilise connection pooling. 
	function getDb(callback) {
		
		if(!theDb) {
			// connect to the db
			mongodb.MongoClient.connect(config.dbUrl, function(err, db) {
				if(err) {
					callback(err, null);
				} else {
					theDb = {
						db: db,
						users: db.collection("users")
					};
					callback(null, theDb);
				}
			});
		}
		else {
			callback(null, theDb);
		}
	}

	return {
		getDb: getDb
	};
};