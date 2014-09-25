angular.module('vidhi', ['ngResource', 'ngRoute'])
.config(function ($routeProvider, $locationProvider) {	
	$locationProvider.html5Mode(true); //Enables clean urls without # in url routes.
	$routeProvider
	.when('/sign-in', {
		templateUrl: '/partials/sign-in.html', 
		controller : 'signInController'
	})
	.when('/sign-up', {
		templateUrl: '/partials/sign-up.html', 
		controller : 'signUpController'
	})
	.otherwise({
		redirectTo: '/'
	});
})
.controller('signInController', function($scope, $http) {
	$scope.title = "Vidhi - Sign in";
	$scope.signIn = function(email, password) {
		$http.post('/login', {username: email, password: password})
			.then(function(response) {
				if(response.data.success) {
					$scope.user = response.data.user;
					console.log("logged in..");
				} else {
					console.log("failed to log in.")
				}
			});
	};
})
.controller('signUpController', function($scope, $http, $location) {
	$scope.title = "Vidhi - Sign up for a free account";
	
	$scope.signUp = function(user){
		console.log(JSON.stringify(user));
		$http.post('/signUp', {
			username: user.email, 
			firstName: user.firstName, 
			lastName: user.lastName,
			email: user.email,
			password : user.password,
			firmName: user.firstName,
			phoneNumber: user.phoneNumber})
		.then(function(response) {
			if(response.data.success) {
				$location.path("/sign-in");
			} else {
				console.log("failed to create user.");
			}
		});
	};

	$scope.passwordsMatch = function(user) {
		return user.password === user.confirmedPassword;
	}
});
