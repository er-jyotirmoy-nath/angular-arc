myapp.factory('NewsService', ['$http', function ($http) {
        return {
            set_news: function (send_data) {
                return $http.post("php/news_class.php", send_data, {
                    transformRequest: angular.identity,
                    headers: {
                        "Content-Type": undefined,
                        "Process-Data": false
                    }
                });

            },
            get_news: function (get_data) {
                return $http.post("php/news_class.php", get_data);
            }
        };
    }])
myapp.controller("newsCtrl", ['$scope', '$http', 'NewsService', function ($scope, $http, NewsService) {
        $scope.news_item = "";
        $scope.btntext = "Submit";
        $scope.btndis = false;
        console.log("Get News Called");
        var getdata = {
            getnews: "get"
        };
        NewsService.get_news(JSON.stringify(getdata)).success(function (response) {
            $scope.news_item = response;
        });
        $scope.save_news = function () {
            $scope.btntext = "Working...";
            $scope.btndis = true;
            var headline = $scope.news_title;
            var image = $scope.news_image;
            var visibility = $scope.news_vis;
            var content = $scope.tinymceModel;
            var fd = new FormData();
            fd.append('headline', headline);
            fd.append('content', content);
            fd.append('image', image);
            fd.append('visibility', visibility);
            NewsService.set_news(fd).success(function (response) {
                $scope.btntext = "Submit";
                $scope.btndis = false;
                $scope.refresh();
                $("#news_frm")[0].reset();
            });
        };
        $scope.delete_rec = function (id) {
            var fd2 = new FormData();
            fd2.append("delete_news", "delete_news");
            fd2.append("news_id", id);
            NewsService.set_news(fd2).success(function (response) {
                $scope.refresh();
                alert(response);
            });
        };
        $scope.refresh = function () {
            NewsService.get_news(JSON.stringify(getdata)).success(function (response) {
                $scope.news_item = response;
            });
        };
    }]);