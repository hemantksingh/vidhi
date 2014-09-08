var http = require("http");
var express = require("express");

var app = initialiseApp();
app.get("/", function(req, res) {
	res.render("index", {});
});

var server = http.createServer(app);
server.listen(4000);
console.log("Server started at port:4000");


function initialiseApp() {
	var app = express();
	app.set("view engine", "vash");
	app.use(express.static(__dirname + "/public"));
	return app;
}