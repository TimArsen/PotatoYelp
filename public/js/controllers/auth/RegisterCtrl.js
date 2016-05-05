angular.module('potatoApp').controller('RegisterController', function($scope, $http, $location) {
    
    $scope.user = {};
    
    $scope.newUser = function() {
        $http.post('/register', $scope.user)
            .then(function(res) {
                if(res.data.username){
                   $location.path("/potatoes");
                } else {
                    $scope.error = res.data.message;
                    $scope.user = {};
                }
            });
    };

});