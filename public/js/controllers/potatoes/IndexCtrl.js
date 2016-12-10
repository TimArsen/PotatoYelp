angular.module('potatoApp').controller('PotatoesController', function($scope, PotatoResource) {

    $scope.potatoes = PotatoResource.query();
    
    $scope.order = "name";
    
    $scope.searching = false;
    
    // set filter
    $scope.filter = function(e, order){ //ng-click function for sorting buttons
        if ($scope.order == order || $scope.order == '-' + order || $scope.order == order.substr(1)) { // if the button is already chosen
            if ($scope.order.charAt(0) == '-') { // if the sort is already reverse
                var nonreverse = $scope.order.substr(1); //set var nonreverse to the order str without the '-'
                console.log("old", $scope.order)
                $scope.order = nonreverse; //make the order nonreverse
                console.log("new", $scope.order)
                $(e.currentTarget).attr('title', 'Sort Ascending').html(
                    $(e.currentTarget).html().slice(0,-1) + "▴"
                    );
            } else { //if the sort is not already reverse
                var reverse = '-' + $scope.order;
                console.log("old", $scope.order)
                $scope.order = reverse; //reverse the order
                console.log("new", $scope.order)
                $(e.currentTarget).attr('title', 'Sort Descending').html(
                    $(e.currentTarget).html().slice(0,-1) + "▾"
                    );
            }
        } else { //if clicking on a button different than the one chosen
            $scope.order = order;
            console.log($scope.order)
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
            });
        }
    } 
    
    $scope.searchCancel = function () { //ng-click function for search "X" button
        $scope.query = "";
        $scope.searchBlur();
    }
    
    $scope.searchClick = function() { //ng-click function for search "🔍" button
        if (!$scope.searching) { //if not already searching
            $('#query-title').slideDown(100);
            $('#search-input').focus();
        } else {
            $scope.searchCancel();
        }
    }
    
});

/*
this .directive allows us to use ng-model, 
which normally applies only to inputs, 
on any contenteditable element.  
This is used for #search-input, a span, 
which was made a span instead of an input 
so that it could have a width:auto (not possible with inputs)
and be centered.  for more info see: 
http://fdietz.github.io/recipes-with-angular-js/common-user-interface-patterns/editing-text-in-place-using-html5-content-editable.html
*/
angular.module('potatoApp').directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {//The read function updates the model based on the view’s user input.
          
         //if last char is a space, the html value is '&nbsp;' , so we need to get rid of it so it doesn't mess up the model which is used for filtering
        var newValue = element.html().split('&nbsp;');
        
        if (newValue[1] == "") { //if '&nbsp;' was found
            newValue = newValue[0] + ' '; //replace it with a space char
        } else {
            newValue = newValue[0]; 
        }
          
        ngModel.$setViewValue(newValue);
        
      }

      ngModel.$render = function() { //the $render function is doing the same as read() but in the other direction, updating the view for us whenever the model changes.
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});