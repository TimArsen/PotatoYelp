angular.module('potatoApp').controller('EditReviewController', function($scope, ReviewResource, $routeParams, $location, $http) {
    $scope.currentUser = {};
    
    $http.get("/api/users/current")
        .then(function(res){
            console.log(res.data);
            $scope.currentUser = res.data;
        });

    $scope.review = ReviewResource.get({id: $routeParams.id});
    
    $scope.updateReview = function() {
        console.log("updating review");
        $scope.review.$update(function(){
            $location.path("/potatoes/" + $routeParams.potato_id + "/reviews/" + $scope.potato._id);
        });
    };

});