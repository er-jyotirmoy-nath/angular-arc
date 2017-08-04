myapp.factory('contactusService', ['$http', function($http) {
    return {
        man_contact_details: function(send_data) {
            return $http.post("php/contactus_class.php", send_data, {
                transformRequest: angular.identity,
                headers: {
                    "Content-Type": undefined,
                    "Process-Data": false
                }
            });
        }
    };
}]);
myapp.controller('contactCtrl', ['$scope', 'contactusService', function($scope, contactusService) {
        $scope.btntext = "Submit";
                    $scope.btndis = false;
	var fs2 = new FormData();
	fs2.append("getdata","getdata");
	contactusService.man_contact_details(fs2).success(function(response){
		console.log(response);
		$scope.conemail = response[0].emailid;
		$scope.comnumber = response[0].phonenumber;
		$scope.conwebsite = response[0].website;
		$scope.confacebook = response[0].facebook;
		$scope.conlinkedin = response[0].linkedin;
		$scope.contweeter =  response[0].twitter;
		$scope.congogleplus = response[0].googleplus;
		$scope.conaddress = response[0].address;
	});
    $scope.save_contact_details = function() {
        $scope.btntext = "Working..";
        $scope.btndis = true;
        var fd = new FormData();
        fd.append("conemail",$scope.conemail);
        fd.append("comnumber",$scope.comnumber);
        fd.append("conwebsite",$scope.conwebsite);
        fd.append("confacebook",$scope.confacebook);
        fd.append("conlinkedin",$scope.conlinkedin);
        fd.append("contweeter",$scope.contweeter);
        fd.append("congogleplus",$scope.congogleplus);
        fd.append("conaddress",$scope.conaddress);
        contactusService.man_contact_details(fd).success(function(response) {
            $scope.btntext = "Submit";
            $scope.btndis = false;
            alert(response);
        });
    };

}])