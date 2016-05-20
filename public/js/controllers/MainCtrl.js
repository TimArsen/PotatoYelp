angular.module('potatoApp').controller('MainController', function($scope, $rootScope, $http, $location, authService) {
    
    // Listen for login event
    $scope.$on('event:auth-loginConfirmed', function(event, data){
        $rootScope.isLoggedin = true;
        $scope.currentUser = data;
        
    });
    
    // Logout function
    $scope.userLogout = function() {
        $http.get("/logout").then(function(res){
            $rootScope.isLoggedin = false;
            $scope.currentUser = false;
            $location.path("/potatoes");
        });
    };
});