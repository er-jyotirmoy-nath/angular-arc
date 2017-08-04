/* 
 * The code on this file is licensed to NSF International
 * All rights reserved
 */
myapp.factory("newsService",["$http","$q",function($http,$q){
        return {
            getnewsdetail:function(send_data){
                var q = $q.defer();
                $http.post("http://nsfaaws6.nsf.org/online_application_v2/online_application_v3/php/customer_home/customer_home.php",send_data,{
                    transformRequest:angular.identity,
                    headers:{"Content-Type":undefined}
                }).success(function(response){
                    q.resolve(response);
                }).error(function(error){
                    q.reject(error);
                });
                return q.promise;
            }
        };
}]);

myapp.controller("newsupdateCtrl",["$scope","newsService","$stateParams","$location",function($scope,newsService,$stateParams,$location){
        $scope.newsid = $stateParams.news_id;
        $scope.news = [];
        var fd = new FormData();
        fd.append("get_details","get_details");
        fd.append("newstitle",$scope.newsid);
        newsService.getnewsdetail(fd).then(function(response){
            //console.log(response);
            $scope.news = response;
        },function(error){
            console.log(error);
        });
}]);