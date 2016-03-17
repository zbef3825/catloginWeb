var catPage = angular.module('catPage',['ngRoute', 'angular-jwt']);

catPage.config(function($routeProvider, $locationProvider, $httpProvider, jwtInterceptorProvider){
    
    jwtInterceptorProvider.tokenGetter = function(){        
        return localStorage.getItem('id_token');
    }
    
    $httpProvider.interceptors.push('jwtInterceptor');
    
    $routeProvider
    .when('/', {
        templateUrl: "pages/main.html",
        controller: 'mainController',
        resolve: {
            factory: checkToken
        }
    })
    .when('/loggedOn', {
        templateUrl: "pages/loggedOn.html",
        controller: 'loggedController',
        resolve: {
            factory: checkToken
        }
    })
    .otherwise({ redirectTo:'/' });
});

catPage.controller('mainController', ['$scope', '$http', '$window', "$location", function($scope, $http, $window, $location){
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
                $window.localStorage.id_token = data.token;
                $location.path('/loggedOn');
            }
            else if(!data.success) {
                $scope.hideLogin = false;
                $scope.successfulLog = 'has-error';
                $scope.disabled = false;
            }
        })
    } 
}]);

catPage.controller('loggedController', function($scope, $window, $http, $location, jwtHelper, toHome){
    $scope.date = 0;
    $scope.reportCommentHide = true;
    $scope.reportSent = true;
    
    $http.get("http://localhost:3000/api/pets/one",{
        //for future update... type should be changed
        params: {"type": 'cat', "date": $scope.date}})
        .success(function(doc){
            //console.log(doc);
            if(doc.success){
                //console.log(doc);
                $scope.idphoto = doc.data[0]._id;
                $scope.date = doc.data[0].date;
                $scope.address = doc.data[0].imglink;
                $scope.like = doc.data[0].upvote;
            }
        });
    
    
    var token = $window.localStorage.getItem('id_token');
    var payload = jwtHelper.decodeToken(token);
    //console.log(payload);
    $scope.username = payload.username;
    
    
    
    $scope.onNextClick = function(){
        //console.log($scope.current);
        $scope.likeDisabled = false;
        $scope.sendDisabled = false;
        $scope.reportCommentHide = true;
        $scope.reportSent = true;
        $http.get("http://localhost:3000/api/pets/one",{
        //for future update... type should be changed
        params: {"type": 'cat', "date": $scope.date}})
        .success(function(doc){
            //console.log(doc);
            if(doc.success){
                //console.log(doc);
                $scope.idphoto = doc.data[0]._id;
                $scope.date = doc.data[0].date;
                $scope.address = doc.data[0].imglink;
                $scope.like = doc.data[0].upvote;
            }
        });
    }
    
    $scope.onLikeClick = function(){
        $scope.likeDisabled = true;
        $http.post("http://localhost:3000/api/pets/upvote",{
            date: $scope.date,
            imglink: $scope.address,
            upvote: $scope.like
        }).success(function(data){
            if(data.success){
                $scope.like = $scope.like + 1;
            }
        });
    }
    
    $scope.onReportClick = function(){
        $scope.reportCommentHide ? $scope.reportCommentHide = false : $scope.reportCommentHide = true;
    }
    
    $scope.onClickSend = function(){
        $scope.sendDisabled = true;
        $http.post("http://localhost:3000/api/pets/report",{
            _id: $scope.idphoto,
            comment: $scope.reportText
        }).success(function(data){
            if(data.success){
                $scope.reportSent = false;
                $scope.reportText = null;
            }
        });
    }
    
    $scope.onClickLogout = function(){
        localStorage.removeItem('id_token');
        toHome();
         
    } 
    
});

catPage.factory('toHome', function($location){
    return function(){
        $location.path('/');
    }
});

var checkToken = function($location){
    if(localStorage.getItem('id_token') == undefined || localStorage.getItem('id_token') == null){
        $location.path('/');
    }
}