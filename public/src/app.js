angular.module('vidhi', ['ngResource', 'ngRoute'])
.config(function ($routeProvider, $locationProvider) {	
	$locationProvider.html5Mode(true); //Enables clean urls without # in url routes.
	$routeProvider
	.when('/sign-in', {
		templateUrl: '/partials/sign-in.html', 
		controller : 'signInController'
	})
	.otherwise({
		redirectTo: '/'
	});
})
.controller('signInController', function($scope) {
	$scope.title = "Vidhi - Sign in";
});

