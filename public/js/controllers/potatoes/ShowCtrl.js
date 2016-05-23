angular.module('potatoApp')
    .controller('ShowController', 
    function($scope, $rootScope, PotatoResource, ReviewResource, $routeParams, $location) {
        
        $scope.loadData = function () {
            // Fetch Potato from database
            $scope.potato = PotatoResource.get({ id: $routeParams.id });
        
            // initialize blank review for form
            $scope.review = new ReviewResource;
            // add potato id to blank review
            var id = $routeParams.id;
            $scope.review.potato = { id: id};
            
            $scope.collapsed = true;
            
        };
        
        $scope.loadData();
        
        // Delete Potato function
        $scope.deletePotato = function(potato){
            potato.$delete();
        };
        
        // Create new review function
        $scope.newReview = function(){
            $scope.review.$save(function(){
                $scope.loadData();
            });
        };
        
        // Collapse review form function
        $scope.collapse = function (){
            $scope.collapsed = !$scope.collapsed;
        };
        
});