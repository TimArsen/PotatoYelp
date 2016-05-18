angular.module("potatoApp").controller("LoginController", function($scope, $http, $location, authService) {
    $scope.user = {};
    $scope.userLogin = function(){
        console.log("login running: " + $scope.user.username);
        $http.post("/login", $scope.user)
            .then(function(res){
                if(res.data.username){
                    console.log(res.data);
                    authService.loginConfirmed(res.data);
                    $location.path("/profile");
                } else {
                    $scope.error = res.data.message;
                    $scope.user = {};
                }
            });
    }
});