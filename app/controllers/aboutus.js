/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
myapp.factory("aboutusService", function ($http) {
    return {
        setAboutus: function (send_data) {
            return $http.post("php/aboutus_class.php", send_data, {
                transformRequest: angular.identity,
                headers: {"Content-Type": undefined, "Process-Data": false}
            });
        }
    };
});
myapp.controller("aboutusCtrl", ["$scope", "$http", "aboutusService", function ($scope, $http, aboutusService) {
        $scope.btntext = "Submit";
            $scope.btndis = false;
        var get_content = "getcontent";
        var fd1 = new FormData();
        fd1.append("get_content",get_content);
        aboutusService.setAboutus(fd1).success(function(response){
            console.log(response);
            $scope.about_text = response.subtitle;
            $scope.tinymceModel = response.content;
        });


        $scope.save_content = function () {
            $scope.btntext = "Working...";
            $scope.btndis = true;
            var subtitle = $scope.about_text;
            var about_content = $scope.tinymceModel;
            var set_content = "save";
            var fd = new FormData();
            fd.append("subtitle",subtitle);
            fd.append("about_content",about_content);
            fd.append("set_content",set_content);
            aboutusService.setAboutus(fd).success(function(response){
                $scope.btntext = "Submit";
            $scope.btndis = false;
                console.log(response);
                alert(response);
                $scope.refresh();
            });
        };
        
        $scope.refresh = function(){
            var get_content = "getcontent";
        var fd1 = new FormData();
        fd1.append("get_content",get_content);
        aboutusService.setAboutus(fd1).success(function(response){
            console.log(response);
            $scope.about_text = response.subtitle;
            $scope.tinymceModel = response.content;
        });
        };
        
    }]);


