angular.module('potatoApp').controller('MainController', function($scope, $timeout, $http, $routeParams) {

    $scope.currentUser = {};

     $http.get("/api/users/current")
        .then(function(res){
                $scope.currentUser = res.data;
        });
    
    //$scope.currentUser = {};
    //$scope.currentUser.username = "";
    //console.log($scope.currentUser.username);
    
    // Logout
    $scope.userLogout = function() {
        console.log("Logging you out!");
        $http.get("/logout");
        //$scope.currentUser = {};
    }

});