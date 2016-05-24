angular.module('potatoApp')
    .controller('MainController', 
        function($scope, $rootScope, $http, $location, authService) {
    
            // Listen for login event
            $scope.$on('event:auth-loginConfirmed', function(event, data){
                $rootScope.isLoggedin = true;
                $scope.currentUser = data;
                
            });
            
            // Listen for logout event
            $scope.$on('event:auth-loginCancelled', function(event, data){
                $rootScope.isLoggedin = false;
                $scope.currentUser = data;
            });
            
            // Register Function
            $scope.userRegister = function (){
                // Broadcast register required event when register button is clicked
                $rootScope.$broadcast('event:auth-registerRequired', {}); 
            };
            // Login Function
            $scope.userLogin = function (){
                // Broadcast login required event when login button is clicked
                $rootScope.$broadcast('event:auth-loginRequired', {}); 
            };
          
        
            // Logout function
            $scope.userLogout = function() {
                $http.get("api/auth/logout").then(function(res){
                    authService.loginCancelled();
                });
            };
            
            // expand #footer-padding to size of footer so footer does not hide content
            $( document ).ready(function() {
                var footerHeight = $('footer').css('height');
                $('#footer-padding').css('height', footerHeight);
            });
});