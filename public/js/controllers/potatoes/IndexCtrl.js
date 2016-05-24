angular.module('potatoApp').controller('PotatoesController', function($scope, PotatoResource) {

    $scope.potatoes = PotatoResource.query();
    
    $scope.order = "name";
    
    $scope.searching = false;
    
    var spaces = 0;
    
    var oldLength;
    
    // set filter
    $scope.filter = function(order){
            $scope.order = order;
    };
    
    $scope.searchBlur = function() {
        if (!$scope.query) {
            $('#query-title').slideUp(100, function() {
                $('#search-chkbx').attr('checked',false);
                $scope.searching = false;
                $('#search-input').css("width", 30);
                spaces = 0;
                oldLength = 0;
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
    
    $scope.resizeInput = function(e) {
        oldLength = $('#search-input').val().length;
        var spanWidth = $('#query-title span').width() + 30;
        if (e.which === 32){ //if key is space bar, add 9 px to width
            spaces++;
        }
        if (e.which === 8 || e.which === 46) { //if key is delete or backspace
            setTimeout(function() {
                spanWidth = $('#query-title span').width() + 30;
                spaces = $('#search-input').val().split(" ").length - 1; //set spaces var to number of remaining spaces in input
                $('#search-input').css("width", spanWidth + (spaces * 9));
            }, 0.1);
        } else {
            $('#search-input').css("width", spanWidth + (spaces * 9));
        }
    }
    
    $scope.resizeInputRemoval = function() {
        setTimeout(function() {
            var newLength = $('#search-input').val().length;
            var spanWidth = $('#query-title span').width() + 30;
            if (newLength <= oldLength) {
                spaces = $('#search-input').val().split(" ").length - 1; //set spaces var to number of remaining spaces in input
                $('#search-input').css("width", spanWidth + (spaces * 9));
            }
                
            }, 0.1);
        
    }
    
    
});


