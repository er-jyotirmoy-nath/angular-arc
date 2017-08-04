myapp.factory('solutionsService', ['$http', function($http){
	return {
		save_content:function (send_data) {
			return $http.post("php/entrance_class.php", send_data, {
				transformRequest:angular.identity,
				headers:{"Content-Type":undefined,"Process-Data":false}
			});
		}
	};
}]);

myapp.controller('solutionCtrl', ['$scope','solutionsService', function($scope,solutionsService){
	var get_content = "";
        $scope.btntext = "Submit";
        $scope.btndis = false;
	
	$scope.get_response = function(){
	console.log($scope.section_type);
	var get_content = "content";
	var section = $scope.section_type;
	var fd = new FormData();
	fd.append('get_content',get_content);
	fd.append('section',section);
	solutionsService.save_content(fd).success(function(response){
		$scope.solution_text = response.subtitle;
		$scope.tinymceModel = response.content;
	});

	$scope.save_content = function(){
                $scope.btntext = "Working...";
        $scope.btndis = true;
		var fd2 = new FormData();
		fd2.append("solution_text",$scope.solution_text);
		fd2.append("solution_content",$scope.tinymceModel);
		fd2.append("section",$scope.section_type);
		solutionsService.save_content(fd2).success(function(response){
                    $scope.btntext = "Submit";
                    $scope.btndis = false;
			alert(response);
		});
	};

};
	

}]);