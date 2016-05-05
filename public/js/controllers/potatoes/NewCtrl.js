angular.module('potatoApp').controller('NewController', function($scope, PotatoResource, $location) {
    $scope.potato = new PotatoResource;
    
    $scope.newPotato = function(){
        console.log($scope.potato);
        $scope.potato.$save(function(){
            $location.path("/potatoes/" + $scope.potato._id);
        });
    };
});