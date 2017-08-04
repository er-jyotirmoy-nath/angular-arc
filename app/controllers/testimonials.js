myapp.factory("testimonialService",function($http){
    return {
        serviceTestimonial:function(send_data){
            console.log(send_data);
            return $http.post("php/testimonial_man.php",send_data);
        }
    };
});

myapp.controller("testimonialCtrl",["$scope","$http","testimonialService",function($scope,$http,testimonialService){
    var send_data = {get_data:"get"};
    $scope.btntext = "Submit";
        $scope.btndis = false;
    testimonialService.serviceTestimonial(JSON.stringify(send_data)).success(function(response){
        $scope.testimonials = response;
        //console.log(response);
    });
    
    $scope.save_testimonial = function(){
        $scope.btntext = "Working...";
        $scope.btndis = true;
        var pname =  $scope.pname;
        var pdesignation = $scope.pdesignation;
        var ptestimonial = $scope.ptestimonial;
        var tvisible = $scope.tvisible;
        var save_send_data = {
            pname:pname,
            pdesignation:pdesignation,
            ptestimonial:ptestimonial,
            tvisible:tvisible
        };
        testimonialService.serviceTestimonial(JSON.stringify(save_send_data)).success(function(response){
        $scope.refresh();
        $scope.btntext = "Submit";
        $scope.btndis = false;
        $("#testimonial_frm")[0].reset();
        //console.log(response);
    });
    };
    
    $scope.delete_rec = function(id){
       var del_data = {id:id,delete_test:"delete"};
        //console.log(fd);
        testimonialService.serviceTestimonial(del_data).success(function(response){
            $scope.refresh();
        });
    };
    
    $scope.refresh = function(){
        testimonialService.serviceTestimonial(JSON.stringify(send_data)).success(function(response){
        $scope.testimonials = response;
        //console.log(response);
    });
    };
}]);