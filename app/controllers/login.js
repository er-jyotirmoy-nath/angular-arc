

applogin.factory("loginService",function($http,$location){
    return {
        login:function(send_data,scope){
            console.log(send_data);
            var $promise = $http.post("model/account_login.php",send_data);
            $promise.success(function(response){
                if(response.error == "false" && response.status == "ok"){
                    window.location.assign('/web-admin/admin/');
                }
            });
        }
    };
});

applogin.controller("loginCtrl",["$scope","$http","loginService",function($scope,$http,loginService){
        $scope.login_stat = "";
        $scope.login = function(user){
            loginService.login(JSON.stringify(user),$scope);
        };
}]);