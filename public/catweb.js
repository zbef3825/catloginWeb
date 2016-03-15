var catPage = angular.module('catPage',['ngRoute']);

catPage.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: "pages/main.html",
        controller: 'mainController'
    })
    .when('/logged', {
        templateUrl: "pages/logged.html",
        controller: "loggedController"
    })
});

catPage.controller('mainController', ['$scope', '$log', function($scope, $log){
    //use username to check if that user name is valid
    $scope.userName = '';
    
    //makesure password and passwordRe fields are same
    $scope.passw1 = '';
    $scope.passw2 = '';
    
    //whenever password fields are changing, run validation function
    $scope.$watch('passw1', function(){
        $scope.validate();
    });
    $scope.$watch('passw2', function(){
        $scope.validate();
    });
    
    $scope.validate = function() {
        if($scope.passw1 !== $scope.passw2){
            $scope.error = true;
            $scope.hide = false;
        }
        else {
            $scope.error = false;
            
        }
        $scope.incomplete = false;
        if(!$scope.userName.length || !$scope.passw1 || !$scope.passw2){
            $scope.incomplete = true;
        }
    }
    
    $scope.usernameexist='';
    $scope.passwordexist='';
}]);

catPage.controller('loggedController', ['$scope', '$log', function($scope, $log){
    
}]);