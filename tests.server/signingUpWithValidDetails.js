var should = require('should');
var hasher = require('../server/hasher')(require('crypto'));
var userController = require('../server/controllers/userController');
var fakeUserRepository = require('../tests.server/fakes/fakeUserRepository');

describe("Signing up with valid details", function() {
	
	var responseSuceeded = false;
	var createdUser = null;
	var userRepository = fakeUserRepository();

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

		userController({}, hasher, userRepository).signUp(request, response);
	});

	it("should create a user.", function(){
		createdUser.firstName.should.equal("H");
		createdUser.lastName.should.equal("K");
		createdUser.username.should.equal("user@org.com");
		createdUser.email.should.equal("user@org.com");
		createdUser.firmName.should.equal("Firm");
		createdUser.phoneNumber.should.equal("0123 456789");
	});

	it("should encrypt the user password.", function() {
		createdUser.passwordHash.should.not.equal("password");
		should(createdUser.salt).not.equal(null);		
	});

	it("should save the user.", function() {
		userRepository.getUser("user@org.com", function(err, user){
			should(user).not.equal(null);
		});
	});

	it("should return a response", function(){
		responseSuceeded.should.equal(true);
	});
});
