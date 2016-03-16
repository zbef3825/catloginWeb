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

catPage.controller('mainController', ['$scope', '$http', '$location', function($scope, $http, $location){
    //use username to check if that user name is valid
    $scope.userName = '';
    
    //makesure password and passwordRe fields are same
    $scope.passw1 = '';
    $scope.passw2 = '';
    
    //Hiding helpful popups
    $scope.hideID = true;
    $scope.hideConfirm = true;
    
    
    //whenever password fields are changing, run validation function
    $scope.$watch('passw1', function(){
        $scope.validate();
    });
    $scope.$watch('passw2', function(){
        $scope.validate();
    });
    
    $scope.$watch('userName', function(){
        $scope.checkID();
    });
    
    $scope.checkID = function() {
        $http.get("http://localhost:3000/api/idcheck/", {
            params: {"id": $scope.userName}})
            .success(function(data){
            if(!data.success && $scope.userName.length == 0){
                $scope.hideID = true;
            }
            
            else if(!data.success && $scope.userName.length > 0){
                $scope.errorID = false;
                $scope.classname = 'has-success';
                $scope.hideID = true;
            }
            else {
                $scope.errorID = true;
                $scope.classname = 'has-error';
                $scope.hideID = false;
                $scope.helptext = "This user name is already taken"
            }
            
        });
    }
    
    $scope.validate = function() {
        if($scope.passw1 !== $scope.passw2 && $scope.passw2.length > 0){
            $scope.errorPW = true;
            $scope.pwsame = 'has-error';
            $scope.hidePW = false;
        }
        else if($scope.passw2.length == 0) {
            $scope.hidePW = true;
        }
        else if($scope.passw1 == $scope.passw2) {
            $scope.errorPW = false;
            $scope.pwsame = 'has-success';
            $scope.hidePW = false;
            $scope.helpPWtext = "Password is matching"
        }
        $scope.incomplete = false;
        if(!$scope.userName.length || !$scope.passw1 || !$scope.passw2){
            $scope.incomplete = true;
        }
    }
    
    $scope.onClick = function () {
        $http.post("http://localhost:3000/api/loginCreate/", {
            username: $scope.userName,
            password: $scope.passw1
        }).success(function (data) {
            if(data.success){
                $scope.accountcreated = 'has-success';
                $scope.welcome = "Welcome, " + $scope.userName + "!";
                $scope.hideConfirm = false;
                $scope.hidePW = true;
            }
        });
    }
    
    $scope.usernameexist='';
    $scope.passwordexist='';
    $scope.hideLogin = true;
    
    $scope.onClickLog = function() {
        $scope.successfulLog = ' ';
        $scope.hideLogin = true;
        $scope.disabled = true;
        $http.post("http://localhost:3000/api/login/", {
            username: $scope.usernameexist,
            password: $scope.passwordexist
        }).success(function(data){
            if(data.success){
                //$scope.successfulLog = 'has-success';
                //$scope.welcomeLog = "Welcome back, " + $scope.usernameexist + "!";
                //loads different webpage
                $location.path('/logged');
            }
            else if(!data.success) {
                $scope.hideLogin = false;
                $scope.successfulLog = 'has-error';
                $scope.disabled = false;
            }
        })
    }
    
    
}]);

catPage.controller('loggedController', ['$scope', '$log', function($scope, $log){
    
}]);