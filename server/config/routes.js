var auth = require('./auth');

module.exports = function(app) {
	
	app.post("/login", auth().authenticate);

	// Create a catch-all handler that runs after other regular routes
	// Allow angular SPA to handle the routing on the client.
	app.get("*", function(req, res) {
		res.render("index", {title: 
			"Law Practice & Legal Case Management Software | Vidhi"});
	});
}