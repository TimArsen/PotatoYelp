angular.module('potatoApp').controller('PotatoesController', function($scope, PotatoResource) {

    $scope.potatoes = PotatoResource.query();
    
    $(".filter-options li").on('click', function() {
        $(this).toggleClass("filter-options-selected")
    })
    
});