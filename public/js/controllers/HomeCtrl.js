angular.module('potatoApp').controller('HomeController', function($scope, $rootScope) {

   // Show Register Function
            $scope.showRegister = function (){
                // Broadcast register required event when register button is clicked
                $rootScope.$broadcast('event:auth-registerRequired', {}); 
            };
            
    // header and footer on home page
    $(".navbar").hide();
    $("footer").hide();
    
    // When clicked on login or register, unhide
    $("a").on("click", function() {
      $(".navbar").show();
      $("footer").show();
    });


});