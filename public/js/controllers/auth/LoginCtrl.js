angular.module("potatoApp").controller("LoginController", function($scope, $http, $location, authService) {
    $scope.user = {}; // set blank user object linked to login form
    
    $scope.userLogin = function(){ // function attached to login button
        $http.post("/login", $scope.user) // Send login request with user data
            .then(function(res){    // wait for response
                if(res.data.username){ // If login succesful
                    authService.loginConfirmed(res.data); // prompt login success event
                    $location.path("/profile"); // redirect to User porfile page
                } else {  // if login unsuccessful
                    $scope.error = res.data.message; // set error for future logging
                    $scope.user = {};   // reset user object to blank
                }
            });
    };
});