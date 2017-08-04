var applogin = angular.module("applogin",[]); 


applogin.directive("loginPanel",function(){
    return {
        templateUrl:"partials/tpl/login.tpl.php"
    };
});