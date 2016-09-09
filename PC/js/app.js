var app = angular.module('pcApp', ['ngRoute', 'firebase']).constant('FIREBASE_URL', 'https://prepcar.firebaseio.com/');


	app.run(['$rootScope', '$location', function($rootScope, $location){
    	$rootScope.$on('$routeChangeError', function(event, next, previous, error){ //traps an error if resolve map in /success isn't resolved properly
    		if(error=='AUTH_REQUIRED'){
    			$rootScope.message = 'Sorry you must login to view that page';
    			$location.path('/login');
    		}
    	});
	}]); //run

	app.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.
	  when('/test', {
	      templateUrl: 'test.html',
	      controller: 'MainController'
	    }).
	    when('/home', {
	      templateUrl: 'views/home.html',
	      controller: 'MainController'
	    }).
	    when('/signup', {
	      templateUrl: 'views/signup.html',
	      controller: 'MainController'
	    }).
	    when('/viewsignups', {
	    	templateUrl: 'views/viewsignups.html',
	    	controller: 'MainController'
	    }).
	    when('/success', {
	    	templateUrl: 'views/success.html',
	    	controller: 'MainController'
	    }).
	    otherwise({
	      redirectTo: '/test'
	    });

}]);
  
$(document).ready(function(){

	$(function changeNavOnScroll(){			
		/*$(document).scroll(function() {
			  var dHeight = $(this).height()-$(window).height();
			  if (dHeight >= $(this).scrollTop()) {
			    $('nav').css({
			    	'background': 'rgba(50,110,138,' + $(this).scrollTop() / dHeight + ')'
			    });
			  }
			});*/

			$(window).scroll(function() { // check if scroll event happened
        if ($(document).scrollTop() > 50) { // check if user scrolled more than 50 from top of the browser window
          $(".navbar-fixed-top").css("background-color", "#326e8a"); // if yes, then change the color of class "navbar-fixed-top" to white (#f8f8f8)
        } else {
          $(".navbar-fixed-top").css("background-color", "transparent"); // if not, change it back to transparent
        }
      });

		});

});