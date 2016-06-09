angular.module('potatoApp').controller('PotatoesController', function($scope, PotatoResource) {

    $scope.potatoes = PotatoResource.query();
    
    $scope.order = "name";
    
    $scope.searching = false;
    
    var spaces = 0;
    
    var oldLength;
    
    // set filter
    $scope.filter = function(e, order){ //ng-click function for sorting buttons
        if ($scope.order == order || $scope.order == '-' + order || $scope.order == order.substr(1)) { // if the button is already chosen
            if ($scope.order.charAt(0) == '-') { // if the sort is already reverse
                var nonreverse = order.substr(1); //set var nonreverse to the order str without the '-'
                $scope.order = nonreverse; //make the order nonreverse
                $(e.currentTarget).attr('title', 'Sort Ascending').html(
                    $(e.currentTarget).html().slice(0,-1) + "▴"
                    );
            } else { //if the sort is not already reverse
                var reverse = '-' + order;
                $scope.order = reverse; //reverse the order
                $(e.currentTarget).attr('title', 'Sort Descending').html(
                    $(e.currentTarget).html().slice(0,-1) + "▾"
                    );
            }
        } else { //if clicking on a button different than the one chosen
            $scope.order = order;
            //reset title and arrow on all buttons
            $('.sort-desc').attr('title', 'Sort Descending').each(function() {
                    $(this).html(
                        $(this).html().slice(0,-1) + "▾"
                        );
                });
            $('.sort-asc').attr('title', 'Sort Ascending').each(function() {
                    $(this).html(
                        $(this).html().slice(0,-1) + "▴"
                        );
                });
        }
    };
    
    $scope.searchBlur = function() { //ng-blur function for search input
        //if search btn is not currently being clicked and there is no text in the search input, then close the input and reset all variables used for sizing the input
        if (!$('#search-btn').is('#search-btn:active') && !$scope.query) { 
            $('#query-title').slideUp(100, function() {
                $('#search-chkbx').attr('checked',false);
                $scope.searching = false;
                $('#search-input').css("width", 30);
                spaces = 0;
                oldLength = 0;
            });
        }
    } 
    
    $scope.searchCancel = function () { //ng-click function for search "X" button
        $scope.query = "";
        $scope.searchBlur();
    }
    
    $scope.searchClick = function() { //ng-click function for search "🔍" button
        if (!$scope.searching) {
            $('#query-title').slideDown(100);
            $('#search-input').focus();
        } else {
            $scope.searchCancel();
        }
    }
    
    
    
    $scope.resizeInput = function(e) { //resize the search input when text is entered to keep it centered
        oldLength = $('#search-input').val().length;
        var spanWidth = $('#query-title span').width() + 30; //set spanWidth to width of the hidden, dynamically-resized span
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
    
    $scope.resizeInputRemoval = function() { //resize the search input when text is removed to keep it centered
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


