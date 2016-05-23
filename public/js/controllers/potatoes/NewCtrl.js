angular.module('potatoApp').controller('NewController', function($scope, PotatoResource, $location) {
    $scope.potato = new PotatoResource;
    
    $scope.newPotato = function(){
        $scope.potato.$save(function(response){
            console.log(response);
            $location.path("/potatoes/" + $scope.potato._id);
        });
    };
});