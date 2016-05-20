angular.module("potatoApp")
    .controller("LoginController", 
        function($scope, $http, $location, authService) {
            
            // set blank user object linked to login form
            $scope.user = {}; 
            
            // Hide login modal
            $scope.loginModal = false; 
            
            // When login is required show login modal
            $scope.$on('event:auth-loginRequired', function(event, data){
                console.log("Auth Required");
                $scope.loginModal = true;
            });
            
            // When login is confirmed hide login modal
            $scope.$on('event:auth-loginConfirmed', function(event, data){
                console.log("Auth confirmed");
                $scope.loginModal = false;
            });
            
            // function attached to login button
            $scope.userLogin = function(){ 
                $http.post("api/auth/login", $scope.user) // Send login request with user data
                    .then(function(res){    // wait for response
                        if(res.data.username){ // If login succesful
                            authService.loginConfirmed(res.data); // prompt login success event
                            $location.path("/potatoes"); // redirect to potatoes index page
                        } else {  // if login unsuccessful
                            $scope.error = res.data.message; // set error for future logging
                            $scope.user = {};   // reset user object to blank
                        }
                    });
            };
});