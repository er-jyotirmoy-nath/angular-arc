
myapp.factory("bannerService", function ($http) {
    return {
        serviceBanner: function (send_data) {
            return  $http.post("php/banner_man_class.php", send_data, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined, 'Process-Data': false}

            });
        }
    };
});

myapp.controller("bannerCtrl", ["$scope", "$http", "bannerService", function ($scope, $http, bannerService) {
        $scope.banners = {};
        $scope.btntext = "Submit";
        $scope.btndis = false;
        var fd = new FormData();
        fd.append("load_data", "get");
        bannerService.serviceBanner(fd).success(function (response) {
            console.log(response);
            $scope.banners = response;
        });

        $scope.delete_banner = function (id) {
            var fd1 = new FormData();
            fd1.append("id", id);
            fd1.append("delete_ban", "delete");
            bannerService.serviceBanner(fd1).success(function (response) {
                $scope.refresh();
            });
        };

        $scope.save_banner = function () {
            $scope.btntext = "Working";
            $scope.btndis = true;
            var banner_title = $scope.banner_title;
            var banner_image = $scope.banner_image;
            var ban_show = $scope.ban_show;
            var fd2 = new FormData();
            fd2.append("banner_title", banner_title);
            fd2.append("banner_image", banner_image);
            fd2.append("ban_show", ban_show);
            console.log(banner_image);
            bannerService.serviceBanner(fd2).success(function (response) {
                console.log(response);
                $scope.btntext = "Submit";
                $scope.btndis = false;
                $("#upload_data")[0].reset();
                $scope.refresh();
            });
        };

        $scope.refresh = function () {
            var fd = new FormData();
            fd.append("load_data", "get");
            bannerService.serviceBanner(fd).success(function (response) {

                $scope.banners = response;

            });
        };
    }]);