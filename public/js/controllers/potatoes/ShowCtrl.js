angular.module('potatoApp').controller('ShowController', function($scope, PotatoResource, ReviewResource, $routeParams, $location) {
    $scope.reviews = [];
    $scope.potato_id = $routeParams.id;
    $scope.potato = PotatoResource.get({ id: $routeParams.id }, function(potato) {
        $scope.reviews = potato.reviews;
    });
    
    $scope.deletePotato = function(potato){
        potato.$delete()
            .then(function(response){ 
                console.log("This is the delete potato response!"); 
            });
    };
    
    // !!!UPDATE to update Potato ratings
    $scope.deleteReview = function(review){
        $scope.review = ReviewResource.get({ id: review._id }, 
            function(review) {
                review.$delete();
            });
        
    };
});