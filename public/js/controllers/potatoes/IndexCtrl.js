angular.module('potatoApp').controller('PotatoesController', function($scope, PotatoResource) {

    $scope.potatoes = PotatoResource.query();
    
    $scope.order = "name";
    
    // set filter
    $scope.filter = function(order){
            $scope.order = order;
    };
    
});