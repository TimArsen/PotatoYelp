angular.module('potatoApp').controller('ProfileEditController', function($scope, $location, $http) {
    $scope.currentUser = {};
    
    $http.get("/api/users/current")
        .then(function(res){
            console.log(res.data);
            $scope.currentUser = res.data;
        });
    
    /*
    console.log("outside timeout:");
    console.log($http.get("/api/users/current")
                                .then(function(res){
                                    console.log(res.data);
                                    return res.data;
                                }));
    setTimeout(function() {
        console.log("inside timeout:");
        console.log($scope.currentUser);
    }, 300);
    */
    


    //Drew: currently working on trying to get res.data object from CurrentUser.
    //isn't this necessary for being able to update the user info with updateProfile() below?

    
    
    $scope.updateProfile = function(){
        console.log("updating profile")
        $scope.user.$update(function(){
            $location.path("/users/" + $scope.currentUser._id);
        });
    };

});