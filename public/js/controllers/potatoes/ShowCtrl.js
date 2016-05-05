angular.module('potatoApp').controller('ShowController', function($scope, PotatoResource, $routeParams, $location) {
    $scope.reviews = [];
    $scope.potato_id = $routeParams.id;
    $scope.potato = PotatoResource.get({ id: $routeParams.id }, function(potato) {
        $scope.reviews = potato.reviews;
    });
    
    $scope.deletePotato = function(potato){
        potato.$delete();
        $location.path("/potatoes");
    };
});