myapp.controller("clientsCtrl", ["$scope", "$http", "$location", function ($scope, $http, $location) {
        $scope.btntext = "Submit";
        $scope.btndis = false;
        $scope.clients = "";
        var get_clients = {get_clients: "get"};
        $http.post("php/clients_get.php", JSON.stringify(get_clients)).success(function (response) {
            console.log(response);
            $scope.clients = response;
        });


        $scope.save_client = function () {
            $scope.btntext = "Working...";
            $scope.btndis = true;
            var clientname = $scope.client_name;
            var clientimage = $scope.client_image;
            var clientvis = $scope.client_vis;
            var fd = new FormData();
            fd.append('client_name', clientname);
            fd.append('client_image', clientimage);
            fd.append('client_vis', clientvis);
            $http.post("php/clients_class_man.php", fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined, 'Process-Data': false}
            }).success(function (response) {
                console.log(response);
                $scope.btntext = "Submit";
                $scope.btndis = false;
                $("#set_clients")[0].reset();
                $scope.refresh();
            });
        };



        $scope.delete_client = function (id) {
            var id = id;
            var delete_id = {delete_id: id};
            $http.post("php/clients_get.php", JSON.stringify(delete_id)).success(function (response) {
                console.log(response);
                $scope.refresh();
            });

        };

        $scope.refresh = function () {
            var get_clients = {get_clients: "get"};
            $http.post("php/clients_get.php", JSON.stringify(get_clients)).success(function (response) {
                console.log(response);
                $scope.clients = response;
            });
        };

    }]);