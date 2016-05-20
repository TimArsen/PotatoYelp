angular.module('potatoApp').controller('NewReviewController', function($scope, ReviewResource, $routeParams, $location) {
    $scope.review = new ReviewResource;
    var id = $routeParams.potato_id;
    $scope.review.potato = { id: id};
    
    $scope.newReview = function(){
        $scope.review.$save(function(){
            $location.path("/potatoes/");
        });
    };
});