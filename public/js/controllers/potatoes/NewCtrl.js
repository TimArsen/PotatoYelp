angular.module('potatoApp').controller('NewController', function($scope, PotatoResource, $location) {
    $scope.potato = new PotatoResource;
    
    $scope.newPotato = function(){
        // Add front-end middleware to check if user is logged in
        $scope.potato.$save(function(response){
            console.log(response);
            $location.path("/potatoes/" + $scope.potato._id);
        });
    };
});