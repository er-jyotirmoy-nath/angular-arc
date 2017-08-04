myapp.service("mainService", ['$http', '$q', function ($http, $q) {
        this.getcontent = function (data) {
            var q = $q.defer();
            $http.post("http://nsfaaws6.nsf.org/online_application_v2/online_application_v3/php/customer_home/customer_home.php", data, {
                transformRequest: angular.identity,
                headers: {"Content-Type": undefined}
            }).success(function (response) {
                q.resolve(response);
            }).error(function (errorresponse) {
                q.reject(errorresponse);
            });
            return q.promise;
        };
        
        this.getCount = function(data){
            var q = $q.defer();
            $http.post("http://nsfaaws6.nsf.org/online_application_v2/online_application_v3/php/customer_home/customer_home.php",data,{
                transformRequest: angular.identity,
                headers: {"Content-Type": undefined}
            }).success(function(response){
                q.resolve(response);
            }).error(function(error){
                q.reject(error);
            });
            return q.promise;
        };
    }]);

myapp.controller("mainCtrl", ['$scope', 'mainService', 'Lightbox', function ($scope, mainService, Lightbox) {
        var fd1 = new FormData();
        $scope.events = [];
        fd1.append("get_content", "get_content");
        mainService.getcontent(fd1).then(
                function (response) {
                    $scope.events = response;
                    console.log(response);
                },
                function (error) {
                    console.log(error);
                }
        );
       var fd2 = new FormData();
       $scope.dashcount = [];
       fd2.append("get_count","get_count");
        mainService.getCount(fd2).then(function(response){
            $scope.dashcount = response;
            //console.log($scope.dashcount);
        },function(error){
            console.log(error);
        });
        
        
    }]);


