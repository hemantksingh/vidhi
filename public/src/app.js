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
.controller('signInController', function($scope) {
	$scope.title = "Vidhi - Sign in";
})
.controller('signUpController', function($scope) {
	$scope.title = "Vidhi - Sign up";
});
