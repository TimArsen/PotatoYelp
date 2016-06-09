angular.module('potatoApp')
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // splash page
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
        
        // SHOW Potato 
        .when('/potatoes/:id', {
            templateUrl: 'views/potatoes/show.html',
            controller: 'ShowController'
        })
        
        // USER ROUTES
        //=======================================
        
        // EDIT Profile
        .when('/profile', {
            templateUrl: 'views/auth/userProfile.html',
            controller: 'ProfileEditController'
        });
        

    $locationProvider.html5Mode(true);

}]);
