var myApp = angular.module('myApp', [
    'ngRoute',
    'ngStorage',
    'Controller',
    'ui.bootstrap'

]);


myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/login', {
        templateUrl: '../../public/login.html',
        controller: 'LoginController'
    })


}]);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/adminlogin', {
        templateUrl: '../../public/adminlogin.html',
        controller: 'AdminLoginController'
    })


}]);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/signup', {
        templateUrl: '../../public/signup.html',
        controller: 'SignupController'
    })


}]);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: '../../public/home.html',
        controller: 'HomeController'
    })


}]);


myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: '../../public/home.html',
        controller: 'HomePageController'
    })


}]);


myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/adminpage', {
        templateUrl: '../../public/adminpage.html',
        controller: 'AdminController'
    })


}]);