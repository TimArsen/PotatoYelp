angular.module('potatoApp')
    .controller('EditController', 
        function($scope, PotatoResource, $routeParams, $location, $http) {
            // Find Potato for editing
            $scope.potato = PotatoResource.get({id: $routeParams.id});
            
            // Update Potato function
            $scope.updatePotato = function(){
                // Update Potato
                $scope.potato.$update(function(){
                    // Reroute to Potato Show page
                    $location.path("/potatoes/" + $routeParams.id);
                });
            };

});