var should = require('should');
var authorization = require('../server/authorization');
var fakeUserRepository = require('./fakes/fakeUserRepository');

describe("Signing in with valid username and password", function() {
	var verifiedUser = null;
	
	beforeEach(function() {
		var hasher = fakeHasher();
		hasher.setHash("passwordPlusHash");
		var userRepository = fakeUserRepository();
		userRepository.addUser(
			{
				firstName: "H", 
				lastName: "K", 
				username: "user@org.com",
				email: "user@org.com", 
				password : "password", 
				passwordHash: "passwordPlusHash"
			}, function (err) {}
		);

		authorization(hasher,userRepository)
			.verifyUser("user@org.com", "password", function(err, user) {
				verifiedUser = user;
			});
	});

	it("should sign in the user.", function() {
		should(verifiedUser).not.equal(null);
	});
});

function fakeHasher() {
	var computedHash = null;

	function setHash(hash) {
		computedHash = hash;
	}

	function computeHash(source, salt) {
		return computedHash;
	}

	return {
		setHash : setHash,
		computeHash : computeHash
	};
}