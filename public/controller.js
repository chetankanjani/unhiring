var userController = angular.module("Controller", []);

userController.controller("HomeController", ['$scope', '$http', '$localStorage','$location', function ($scope, $http, $localStorage,$location) {


    $location.path('/login');



}]);

userController.controller("AdminLoginController", ['$scope', '$http', '$localStorage','$location', function ($scope, $http, $localStorage,$location) {

$scope.signin=function() {


    $http.post('/api/adminLogin', $scope.user).success(function (data) {

        if (data.success == true) {
            $location.path('/adminpage');

        }


    });

}


}]);

userController.controller("AdminController", ['$scope', '$http', '$localStorage','$location', function ($scope, $http, $localStorage,$location) {
    $http.get('/api/getAllColleges').success(function(data){

        $scope.colleges=data;

        //console.log(data[0]);
        //console.log($scope.colleges);



    });

}]);


userController.controller("HomePageController", ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {

    $scope.status={};
    $scope.user={};
    $scope.status.userid=$localStorage.userid;
    $scope.user.required={};

    $scope.item={};


    $scope.titles="hello";

    $http.get('/api/searchCollege',{params:{'college':$scope.item.college}}).success(function (data) {


        console.log(data);
        $scope.titles=data;


    });



    $scope.collegesearch=function() {

        console.log("here1");
        $http.get('/searchCollege',{params:{'college':$scope.item.college}}).success(function (data) {


                    console.log(data);
                $scope.titles=data;
        });

    };


    $scope.degreesearch=function() {

        console.log("here1");

        $http.get('/searchCollege',{params:{'college':$scope.item.college,'degree':$scope.item.degree}}).success(function (data) {
            console.log(data);

            $scope.dtitles=data;
        });

    };


    $http.post('/api/getUser',$scope.status).success(function(data){


            //console.log(data);
        $scope.name=data.name;
        if(data.college);
            $scope.college=data.College;
        if(data.degree)
        $scope.degree=data.degree;


        });



}]);
userController.controller("LoginController", ['$scope', '$http', '$localStorage','$location', function ($scope, $http, $localStorage,$location) {


    $scope.signin = function(){

        console.log('inside sigin functuon');

        $http.post('/api/login', $scope.user).success(function(data){

            console.log('In login function');

            if (data.message == "Successfully login") {
                console.log('In success state');

                $localStorage.userid =data.userid;


                $location.path('/home');
            } else {
                //$scope.error_message = 'login request for ' + $scope.user.username;
            }
        })
    };





}]);
userController.controller("SignupController", ['$scope', '$http', '$localStorage','$location', function ($scope, $http, $localStorage,$location) {





    $scope.signup = function () {

        //console.log('inside signup functuon');



        $http.post('/api/signup', $scope.user).success(function (data) {


            if (data.success == true) {
                //console.log('In success state');
                //$rootScope.authenticated = true;

                $localStorage.userid=data.userid;


                $location.path('/');
            } else {
                //$scope.error_message = 'login request for ' + $scope.user.username;
            }
        })
    };




}]);

userController.controller('ModalDemoCtrl',['$scope','$uibModal','$log','$http','$localStorage', function ($scope, $uibModal, $log,$http,$localStorage) {

    $scope.items=[]




    $scope.start=function() {
        $scope.animationsEnabled = true;

        //console.log('hi');

        $http.post('/api/getStatus', $scope.status).success(function (data) {


            console.log(data);

            if (data.success == true)
                $scope.user.required = false;
            else {



                    var size='';


                    //console.log("di");

                    $scope.status = {};
                    $scope.user = {}
                    $scope.status.userid = $localStorage.userid;
                    $scope.user.required = {};


                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'myModalContent.html',
                        controller: 'ModalInstanceCtrl',
                        size: size,
                        resolve: {
                            items: function () {
                                return $scope.items;
                            }
                        }
                    });

                    modalInstance.result.then(function (selectedItem) {
                        $scope.selected = selectedItem;
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });


            }

            console.log($scope.user.required);


        });



    }

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };



}]);



userController.controller('ModalInstanceCtrl',['$scope','$uibModalInstance','items','$http','$localStorage', function ($scope, $uibModalInstance, items,$http,$localStorage) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };



    $scope.collegesearch=function() {

        //console.log("here1");
        $http.get('/api/searchCollege',{params:{'college':$scope.item.college}}).success(function (data) {


            console.log(data);
            $scope.titles=data;
        });

    };


    $scope.degreesearch=function() {

        //console.log("here1");

        $http.get('/api/degreesearch',{params:{'college':$scope.item.college,'degree':$scope.item.degree}}).success(function (data) {
            //console.log(data);

            $scope.dtitles=data;
        });

    };



    $scope.ok = function (college) {


        college.userid=$localStorage.userid;

        console.log($localStorage.userid);

        $http.post('/api/addUserCollege',college).success(function(data){

            if(data.success==true)
                console.log("user college added successfully");

        });

        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);



