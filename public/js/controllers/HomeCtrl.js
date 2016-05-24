angular.module('potatoApp').controller('HomeController', function($scope, $rootScope) {

   // Show Register Function
            $scope.showRegister = function (){
                // Broadcast register required event when register button is clicked
                $rootScope.$broadcast('event:auth-registerRequired', {}); 
            };

});