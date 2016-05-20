angular.module('potatoApp')
    .controller('MainController', 
        function($scope, $rootScope, $http, $location, authService) {
    
    // expand #footer-padding to size of footer so footer does not hide content
    $( document ).ready(function() {
            var footerHeight = $('footer').css('height');
            $('#footer-padding').css('height', footerHeight);
        });
    
    // Listen for login event
    $scope.$on('event:auth-loginConfirmed', function(event, data){
        $rootScope.isLoggedin = true;
        $scope.currentUser = data;
        
    });
    
    // Listen for logout event
    $scope.$on('event:auth-loginCancelled', function(event, data){
        console.log("Auth Cancelled");
        $rootScope.isLoggedin = false;
        $scope.currentUser = false;
    });
    
    // Logout function
    $scope.userLogout = function() {
        $http.get("api/auth/logout").then(function(res){
            console.log("logging Out");
            authService.loginCancelled();
            $location.path("/potatoes");
        });
    };
});

    