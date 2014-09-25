var should = require('should');
var userController = require('../server/controllers/userController');

describe("Signing up with valid details", function() {
	
	var responseSuceeded = false;
	var createdUser = null;

	beforeEach(function() {
		var request = {
			body: {
				firstName: "H",
				lastName: "K",
				username: "user@org.com",
				email: "user@org.com",
				password: "password",
				firmName: "Firm",
				phoneNumber: "0123 456789"
			}
		};

		var response = {
			send : function (responseMsg) {
				responseSuceeded = responseMsg.success;
				createdUser =  responseMsg.user;
			}
		};

		userController({}).signUp(request, response);
	});

	it("should create a user.", function(){
		createdUser.firstName.should.equal("H");
		createdUser.lastName.should.equal("K");
		createdUser.username.should.equal("user@org.com");
		createdUser.email.should.equal("user@org.com");
		createdUser.password.should.equal("password");
		createdUser.firmName.should.equal("Firm");
		createdUser.phoneNumber.should.equal("0123 456789");
	});

	it("should return a response", function(){
		responseSuceeded.should.equal(true);
	});
});
