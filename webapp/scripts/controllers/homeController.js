(function () {
    var homeController = function ($scope) {
        $scope.facebook = () => window.open('https://www.facebook.com/cstr.carlo', '_blank');
        $scope.instagram = () => window.open('https://www.instagram.com/warlooooo/', '_blank');
    }
    var module = angular.module(APP_NAME);
    module.controller('homeController', homeController);
}())