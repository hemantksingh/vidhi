
module.exports = function(app, userController) {
	
	app.post("/login", userController.signIn);
	app.post("/signUp", userController.signUp);

	// Create a catch-all handler that runs after other regular routes
	// Allow angular SPA to handle the routing on the client.
	app.get("*", function(req, res) {
		res.render("index", {title: 
			"Law Practice & Legal Case Management Software | Vidhi"});
	});
};