var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	
	// Node environment variable. 'process.env.ENV_VAR_NAME'
	// It can be set using: PORT=4000 node server.js
	// or in Windows: set PORT=4000

	development: {
		dbUrl : 'mongodb://localhost:27017/vidhi',
		rootPath: rootPath,
		port: process.env.PORT || 4000
	},

	production: {
		dbUrl: 'mongodb://hkumar:vidhi@ds063909.mongolab.com:63909/vidhi',
		rootPath: rootPath,
		port: process.env.PORT || 80 
	}
}