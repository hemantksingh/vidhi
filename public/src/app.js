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
.controller('signUpController', function($scope) {
	$scope.title = "Vidhi - Sign up";
	$scope.signUp = function(){
		console.log("signed up");
	};
});
