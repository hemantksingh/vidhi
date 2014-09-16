var express = require("express");

var app = initialiseApp();
app.get("/", function(req, res) {
	res.render("index", {});
});

app.listen(app.get("port"), function() {
	console.log("Vidhi is running at localhost:" + app.get("port"));	
});

function initialiseApp() {
	var app = express();
	app.set("view engine", "vash");
	// Node environment variable. 'process.env.ENV_VAR_NAME'
	// It can be set using: PORT=4000 node index.js
	// or in Windows: set PORT=4000
	app.set("port", (process.env.PORT || 4000));
	app.use(express.static(__dirname + "/public"));
	return app;
}