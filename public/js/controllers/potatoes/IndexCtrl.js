angular.module('potatoApp').controller('PotatoesController', function($scope, PotatoResource) {

    $scope.potatoes = PotatoResource.query();
    
    $scope.order = "name";
    
    $scope.searching = false;
    
    // set filter
    $scope.filter = function(order){
            $scope.order = order;
    };
    
    $scope.searchBlur = function() {
        if (!$scope.query) {
            $('#query-title').slideUp(100, function() {
                $('#search-chkbx').attr('checked',false);
                $scope.searching = false;
            });
        }
    } 
    
    $scope.searchCancel = function () {
        $scope.query = "";
        $scope.searchBlur();
    }
    
    $scope.searchClick = function() {
        
        if (!$scope.searching) {
            $('#query-title').slideDown(100);
            $('#search-input').focus();
        } else {
            $scope.searchCancel();
        }
    }
    
    
});


