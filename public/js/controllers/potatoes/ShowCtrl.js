angular.module('potatoApp')
    .controller('ShowController', 
        function($scope, $rootScope, PotatoResource, ReviewResource, UserResource, $routeParams, $location) {
            
            $scope.loadData = function () {
                // initialize blank review for form
                $scope.review = new ReviewResource;
                $scope.hasReview = false;
                
                // add potato id to blank review
                var id = $routeParams.id;
                $scope.review.potato = { id: id};
                
                // Fetch Potato from database
                $scope.potato = PotatoResource.get({ id: $routeParams.id });
                
                if($scope.currentUser && $scope.potato){
                    $scope.potato.$promise.then(function(potato) {
                                potato.reviews.forEach(function(review, index, reviews){
                                if(review.author.id == $scope.currentUser._id){
                                    $scope.review = ReviewResource.get({ id: review._id });
                                    $scope.hasReview = true;
                                }
                            });
                    });
                } 
                // Hide review input
                $('#collapsible-review-input').slideUp(300);
            };
            
            // initial loading of data
            $scope.loadData();
            
            // Delete Potato function
            $scope.deletePotato = function(potato){
                potato.$delete();
                $location.path('/potatoes');
            };
            
            // Create new review function
            $scope.newReview = function(){
                $scope.review.$save(function(){
                    $scope.loadData();
                });
            };
            
            // Delete review function
            $scope.deleteReview = function(){
                $scope.review.$delete(function(){
                    $scope.loadData();
                });
            };
            
            // Update review function
            $scope.updateReview = function(){
                $scope.review.$update(function(){
                    $scope.loadData();
                });
            };
            
            // Reload data on login
            $scope.$on('event:auth-loginConfirmed', function(event, data){
                    $scope.loadData();
                });
                
            // Reload data on logout
            $scope.$on('event:auth-loginCancelled', function(event, data){
                    $scope.loadData();
                });
                
            //  ShowLogin Function
            $scope.showLogin = function (){
                // Broadcast login required event when login button is clicked
                $rootScope.$broadcast('event:auth-loginRequired', {}); 
            };
            
            //  Open review input 
            $scope.showReview = function (){
                $('#collapsible-review-input').slideToggle(300);
            }; 
        
});