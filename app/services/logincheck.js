myapp.factory("checkuserloginService",function($http,$q){
    return {
        checklogin: function(){
            var get_login = {check:"check"};
            var q = $q.defer();
            $http.post("model/account_login.php",JSON.stringify(get_login)).success(function(response){
                q.resolve(response);
            }).error(function(err){
                q.reject(err);
            });
            return q.promise;
             
        },
        userlogout:function(){
            var get_login = {check:"logout"};
            return $http.post("model/account_login.php",JSON.stringify(get_login));
        }
    };
});