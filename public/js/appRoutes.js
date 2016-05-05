angular.module('potatoApp')
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // landing page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController',
        })
 
        // POTATO ROUTES
        //=======================================
        
        // ALL Potatoes
        .when('/potatoes', {
            templateUrl: 'views/potatoes/index.html',
            controller: 'PotatoesController'
        })
        
        // NEW Potato
        .when('/potatoes/new', {
            templateUrl: 'views/potatoes/new.html',
            controller: 'NewController'
        })
        
        // EDIT Potato
        .when('/potatoes/:id/edit', {
            templateUrl: 'views/potatoes/edit.html',
            controller: 'EditController'
        })
        
        // SHOW Potato (individual)
        .when('/potatoes/:id', {
            templateUrl: 'views/potatoes/show.html',
            controller: 'ShowController'
        })
        
        // USER AUTH ROUTES
        //=======================================
        
        // Register
        .when('/register', {
            templateUrl: 'views/auth/register.html',
            controller: 'RegisterController'
        })
        
        // Login
        .when('/login', {
            templateUrl: 'views/auth/login.html',
            controller: 'LoginController'
        })
        
        // EDIT Profile
        .when('/profile', {
            templateUrl: 'views/auth/userProfile.html',
            controller: 'ProfileEditController'
        })
        
        // REVIEW ROUTES
        //=========================================
        
        // NEW Review
        .when('/potatoes/reviews/:potato_id', {
            templateUrl: '/views/reviews/new.html',
            controller: 'NewReviewController'
        })
        
        // EDIT Review
        .when('/potatoes/reviews/:id', {
            templateUrl: '/views/reviews/edit.html',
            controller: 'EditReviewController'
        });

    $locationProvider.html5Mode(true);

}]);
