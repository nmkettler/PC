app.controller("MainController", ['$scope', '$firebaseArray', 'FIREBASE_URL', '$routeParams','$location', '$anchorScroll', function($scope, $firebaseArray, FIREBASE_URL, $routeParams, $location, $anchorScroll) {
	var userSignUpRef = new Firebase(FIREBASE_URL + 'signups/');
	$scope.userSignUps = $firebaseArray(userSignUpRef);
		
		//Service that can route users through a button click. 
		$scope.go = function(path){
			$location.path(path);
		}

		$scope.addNewSignUp = function(){
			$scope.userSignUps.$add({
				dealership: $scope.signupDealership,
				firstname : $scope.signupFirstName,
				lastname : $scope.signupLastName,
				email : $scope.signupEmail,
				zip : $scope.zipcode
			}).then(function(regUser){
				$location.path('/success') //$location is a angular service that redirects view to another page
			}).catch(function(error){
				$rootScope.message = error.message;				
			});;
		};

		//typed.js functionality
        $(".typer").typed({
            strings: ["Save Time", "Save Money", "Sell Cars", "PrepCar"],
            typeSpeed: 100
	        });

		    $('.post').addClass(".hide_me").viewportChecker({
		        classToAdd: 'visible animated fadeIn',
		        offset: 100
		       });   

		    $(function showNavButton(){
		    	var navButtonAnchor = $(".navButtonAnchor");
		    	if(navButtonAnchor.length){
		    		var topOfAnchor = navButtonAnchor.offset().top;
		    		 if ($('.main-hero-bg').width() >= 785) {
				   	 	var navButton = $('.navButton');			    
					    $(window).scroll(function(){
					    	if($(window).scrollTop() > topOfAnchor){
					    		$(navButton).fadeIn();
					    		$('.homeButtonGroup').fadeOut();
					    	}
					    	else{
					    		$(navButton).fadeOut();
					    		$('.homeButtonGroup').show();

					    	}
					    })
				   	 }
				   	 if ($('.main-hero-bg').width() <= 785) {
				   	 	var mobileNavButton = $('.mobileNavButton');
				   	 	$(window).scroll(function(){
					    	if($(window).scrollTop() > topOfAnchor){
					    		$(mobileNavButton).fadeIn();
					    		$('.homeButtonGroup').fadeOut();
					    	}
					    	else{
					    		$(mobileNavButton).fadeOut();
					    		$('.homeButtonGroup').show();

					    	}
					    })
				   	 }
			    	}	   	
		   });	

				
	}]);


function onViewport(el, elClass, offset, callback) {
  /*** Based on http://ejohn.org/blog/learning-from-twitter/ ***/
  var didScroll = false;
  var this_top;
  var height;
  var top;
  
  if(!offset) { var offset = 0; }
 
  $(window).scroll(function() {
      didScroll = true;
  });
 
  setInterval(function() {
    if (didScroll) {
      didScroll = false;
      top = $(this).scrollTop();
 
      $(el).each(function(i){
        this_top = $(this).offset().top - offset;
        height   = $(this).height();
 
        // Scrolled within current section
        if (top >= this_top && !$(this).hasClass(elClass)) {
          $(this).addClass(elClass);
 
          if (typeof callback == "function") callback(el);
        }
      });
    }
  }, 100);
}

app.directive('anchorSmoothScroll', function($location){
	'use strict';

    return {
        restrict: 'A',
        replace: false,
        scope: {
            'anchorSmoothScroll': '@'
        },

        link: function($scope, $element, $attrs) {

            initialize();
    
            /* initialize -
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function initialize() {
                createEventListeners();
            }

            /* createEventListeners -
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function createEventListeners() {
                // listen for a click
                $element.on('click', function() {
                    // set the hash like a normal anchor scroll
                    $location.hash($scope.anchorSmoothScroll);

                    // smooth scroll to the passed in element
                    scrollTo($scope.anchorSmoothScroll);
                });
            }

            /* scrollTo -
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function scrollTo(eID) {

                // This scrolling function 
                // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
                
                var i;
                var startY = currentYPosition();
                var stopY = elmYPosition(eID);
                var distance = stopY > startY ? stopY - startY : startY - stopY;
                if (distance < 100) {
                    scrollTo(0, stopY); return;
                }
                var speed = Math.round(distance / 100);
                if (speed >= 20) speed = 20;
                var step = Math.round(distance / 25);
                var leapY = stopY > startY ? startY + step : startY - step;
                var timer = 0;
                if (stopY > startY) {
                    for (i = startY; i < stopY; i += step) {
                        setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
                        leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                    } return;
                }
                for (i = startY; i > stopY; i -= step) {
                    setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
                    leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
                }
            }
            
            /* currentYPosition -
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function currentYPosition() {
                // Firefox, Chrome, Opera, Safari
                if (window.pageYOffset) {
                    return window.pageYOffset;
                }
                // Internet Explorer 6 - standards mode
                if (document.documentElement && document.documentElement.scrollTop) {
                    return document.documentElement.scrollTop;
                }
                // Internet Explorer 6, 7 and 8
                if (document.body.scrollTop) {
                    return document.body.scrollTop;
                }
                return 0;
            }

            /* scrollTo -
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function elmYPosition(scrollAnchor) {
                var elm = document.getElementById('scrollAnchor');
                var y = elm.offsetTop;
                var node = elm;
                while (node.offsetParent && node.offsetParent != document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                } return y;
            }
        }
    };
})

app.directive("flip", function(){
  
  function setDim(element, width, height){
    element.style.width = width;
    element.style.height = height;
  }
  
  return {
    restrict : "E",
    controller: function($scope, $element, $attrs){
      
      var self = this;
      self.front = null,
      self.back = null;
      
      
      function showFront(){
        self.front.removeClass("flipHideFront");
        self.back.addClass("flipHideBack");
      }
      
      function showBack(){
        self.back.removeClass("flipHideBack");
        self.front.addClass("flipHideFront");
      }
      
      self.init = function(){
        self.front.addClass("flipBasic");
        self.back.addClass("flipBasic");
        
        showFront();
        self.front.on("click", showBack);
        self.back.on("click", showFront);
      }
    
    },
    
    link : function(scope,element,attrs, ctrl){
      
      var width = attrs.flipWidth || "300px",
        height =  attrs.flipHeight || "250px";
      
      element.addClass("flip");
      
      if(ctrl.front && ctrl.back){
        [element, ctrl.front, ctrl.back].forEach(function(el){
          setDim(el[0], width, height);
        });
        ctrl.init();
      }
      else {
        console.error("FLIP: 2 panels required.");
      }
      
    }
  }
  
});

app.directive("flipPanel", function(){
  return {
    restrict : "E",
    require : "^flip",
    //transclusion : true,
    link: function(scope, element, attrs, flipCtr){
      if(!flipCtr.front) {flipCtr.front = element;}
      else if(!flipCtr.back) {flipCtr.back = element;}
      else {
        console.error("FLIP: Too many panels.");
      }
    }
  }
});

app.directive("signUpDirective", function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
        	var fName="input[name='fName']";
        	var lName="input[name='lName']";
        	
            //On click
            $('input[name="dName"]').on("input", function(){
            	$(fName).fadeIn("slow");
            	$(".dealerformClass h4").fadeIn("slow");
            })
            $(fName).on("input", function(){
            	$(lName).fadeIn("slow");
            })
            $(lName).on("input", function(){
            	$(".email").fadeIn("slow");
            })
            $(".email").on("input", function(){
            	$(".zip").fadeIn("slow");
            })

        }
    }
});

app.directive("backToTop", function(){
    return{
        restrict: "A",
        link: function(scope, elem, attrs){
            if ($('#back-to-top').length) {
                var scrollTrigger = 50, // px
                    backToTop = function () {
                        var scrollTop = $(window).scrollTop();
                        if (scrollTop > scrollTrigger) {
                            $('#back-to-top').addClass('show');
                        } else {
                            $('#back-to-top').removeClass('show');
                        }
                    };
                backToTop();
                $(window).on('scroll', function () {
                    backToTop();
                });
                $('#back-to-top').on('click', function (e) {
                    e.preventDefault();
                    $('html,body').animate({
                        scrollTop: 0
                    }, 700);
                });
            }
        }
    }
})

app.directive("backToTop", function(){
    return{
        restrict: "A",
        link: function(scope, elem, attrs){
            if ($('#back-to-top').length) {
                var scrollTrigger = 50, // px
                    backToTop = function () {
                        var scrollTop = $(window).scrollTop();
                        if (scrollTop > scrollTrigger) {
                            $('#back-to-top').addClass('show');
                        } else {
                            $('#back-to-top').removeClass('show');
                        }
                    };
                backToTop();
                $(window).on('scroll', function () {
                    backToTop();
                });
                $('#back-to-top').on('click', function (e) {
                    e.preventDefault();
                    $('html,body').animate({
                        scrollTop: 0
                    }, 700);
                });
            }
        }
    }
})

