angular.module('potatoApp').factory('CurrentUser', function($http) {

    return {
        get: function(){
            $http.get("/api/users/current").then(function(res){
                return res.data;
            });
        }

    };
    
});