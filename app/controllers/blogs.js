myapp.controller("blogCtrl",["$scope","$http",function($scope,$http){
         $scope.btntext = "Submit";
  $scope.btndis = false;
$scope.save_blog = function(){
    $scope.btntext = "Working...";
    $scope.btndis = true;
  var blogtitle = $scope.blog_title;
  var blogimage = $scope.blog_image;
  var blogvisible = $scope.blogs_vis;
  var blogcontent = $scope.tinymceModel_blog;
  var fd = new FormData();
  fd.append('blog_title',blogtitle);
  fd.append('blog_image',blogimage);
  fd.append('blogs_vis',blogvisible);
  fd.append('text_blog',blogcontent);
  fd.append('entry_type',"save");
  $http.post("php/blogs_man_class.php",fd,{
    transformRequest: angular.identity,
    headers:{'Content-Type':undefined,'Process-Data':false}
  }).success(function(response){
      $scope.btntext = "Submit";
        $scope.btndis = false;
    console.log(response);
    $("#blog_frm")[0].reset();
  });
};
}]);

myapp.controller("blogeditCtrl",["$scope","$http","$location",function($scope,$http,$location){
  $scope.blogs = "";
  var getdata = {get_blogs:"get"};
  $http.post("php/blogs_get.php",JSON.stringify(getdata)).success(function(response){
    $scope.blogs = response;
  });
    

    
    $scope.delete_blog = function(blog_id_set){
    var id = blog_id_set;
    var getdata = {delete_id:id};
    $http.post("php/blogs_get.php",JSON.stringify(getdata)).success(function(response){
        
        $scope.refresh();
      
    });
  };
    
    $scope.refresh = function(){
      var getdata = {get_blogs:"get"};
  $http.post("php/blogs_get.php",JSON.stringify(getdata)).success(function(response){
    $scope.blogs = response;
  });  
    };
}]);



myapp.controller("editblogCtrl",["$scope","$http","$stateParams","$location",function($scope,$http,$stateParams,$location){

  var id = $stateParams.blog_id;
  $scope.btntext = "Submit";
  $scope.btndis = false;
  $scope.blog_id = id;
  var getdata = {blogs_id:id};
  $http.post("php/blogs_get.php",JSON.stringify(getdata)).success(function(response){
    //var data = JSON.parse(response);
    console.log(response);
    $scope.blog_title = response[0].title;
    $scope.img_src = response[0].image_url;
    $scope.blogs_vis = (response[0].visible == "1")?true:false;
    $scope.tinymceModel_blog = response[0].content_blog;

  });

  $scope.save_blog = function(){
    
    var blogtitle = $scope.blog_title;
    var blogimage = $scope.blog_image;
    var blogvisible = $scope.blogs_vis;
    var blogcontent = $scope.tinymceModel_blog;
    var id = $scope.blog_id;
    var fd = new FormData();
    fd.append('blog_id',id);
    fd.append('blog_title',blogtitle);
    fd.append('blog_image',blogimage);
    fd.append('blogs_vis',blogvisible);
    fd.append('text_blog',blogcontent);
    fd.append('entry_type',"update");
    $http.post("php/blogs_man_class.php",fd,{
      transformRequest: angular.identity,
      headers:{'Content-Type':undefined,'Process-Data':false}
    }).success(function(response){
      console.log(response);
        
        $location.path('/blog_edit').replace();
    });
  };


  
}]);
