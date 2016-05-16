angular.module('potatoApp').controller('EditController', function($scope, PotatoResource, $routeParams, $location, $http) {
    $scope.currentUser = {};
    
    $http.get("/api/users/current")
        .then(function(res){
            console.log(res.data);
            $scope.currentUser = res.data;
        });

    $scope.potato = PotatoResource.get({id: $routeParams.id});
    
    $scope.updatePotato = function(){
        console.log("updating potato")
        $scope.potato.$update(function(){
            $location.path("/potatoes/" + $scope.potato._id);
        });
    };

});