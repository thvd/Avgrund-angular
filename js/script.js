'use strict';

angular.module('showcaseAvgrund', ['ui.avgrund']);

angular.module('showcaseAvgrund').controller('showCaseCtrl', function($scope) {

    $scope.modalIsVisible = false;

    $scope.hideModal = function() {
        $scope.modalIsVisible = false;
    };

    $scope.showModal = function() {
        $scope.modalIsVisible = true;
    };

});