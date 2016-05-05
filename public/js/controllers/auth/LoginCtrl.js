angular.module("potatoApp").controller("LoginController", function($scope, $http, $location) {
    $scope.user = {};
    
    $scope.userLogin = function(){
        //Drew: how does $scope.user get its .username (from mainctrl?) if {} is assigned above?
        console.log("login running: " + $scope.user.username);
        $http.post("/login", $scope.user)
            .then(function(res){
                if(res.data.username){
                    //$scope.currentUser.username = $scope.user.username;
                    $location.path("/profile");
                } else {
                    $scope.error = res.data.message;
                    $scope.user = {};
                }
            });
    }
});