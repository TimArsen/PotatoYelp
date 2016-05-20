angular.module("potatoApp")
    .controller("LoginController", 
        function($scope, $rootScope, $http, $location, authService) {
            
            // set blank user object linked to login/register forms
            $scope.user = {}; 
            
            // Hide login and register modals
                $scope.loginModal = false; 
                $scope.registerModal = false;
            
            // When register is required show register modal/hide login modal
            $scope.$on('event:auth-registerRequired', function(event, data){
                $scope.loginModal = false; 
                $scope.registerModal = true;
            });
            // When login is required show login modal/hide register modal
            $scope.$on('event:auth-loginRequired', function(event, data){
                $scope.loginModal = true;
                $scope.registerModal = false;
            });
            
            // When login is confirmed hide modals
            $scope.$on('event:auth-loginConfirmed', function(event, data){
                $scope.loginModal = false;
                $scope.registerModal = false;
            });
            
            //  Hide both Modals
            $scope.close = function (){
                $scope.loginModal = false; 
                $scope.registerModal = false;
            };
            
             // Show Register Function
            $scope.showRegister = function (){
                // Broadcast register required event when register button is clicked
                $rootScope.$broadcast('event:auth-registerRequired', {}); 
            };
            //  ShowLogin Function
            $scope.showLogin = function (){
                // Broadcast login required event when login button is clicked
                $rootScope.$broadcast('event:auth-loginRequired', {}); 
            };
            
            // function attached to register button
            $scope.userRegister = function(){ 
                $http.post("api/auth/register", $scope.user) // Send login request with user data
                    .then(function(res){    // wait for response
                        if(res.data.username){ // If register succesful
                            $scope.userLogin(); // prompt login function
                        } else {  // if register unsuccessful
                            $scope.error = res.data.message; // set error for future logging
                            $scope.user = {};   // reset user object to blank
                        }
                    });
            };
            
            // function attached to login button
            $scope.userLogin = function(){ 
                $http.post("api/auth/login", $scope.user) // Send login request with user data
                    .then(function(res){    // wait for response
                        if(res.data.username){ // If login succesful
                            authService.loginConfirmed(res.data); // prompt login success event
                        } else {  // if login unsuccessful
                            $scope.error = res.data.message; // set error for future logging
                            $scope.user = {};   // reset user object to blank
                        }
                    });
            };
});