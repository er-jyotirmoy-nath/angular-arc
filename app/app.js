'use strict';

// Declare app level module which depends on views, and components
var myapp = angular.module('myApp', ['ui.router', 'ngSanitize', 'ui.tinymce', 'ui.bootstrap', 'bootstrapLightbox','ui.utils']);

myapp.config(function ($urlRouterProvider, $stateProvider) {
    
    
    $urlRouterProvider.otherwise('/main');

    $stateProvider.
            state("main", {url: "/main", templateUrl: "partials/main.html", controller: "mainCtrl"})
            .state("manage_files", {url: "/manage_files", templateUrl: "partials/manage_files.html", controller: "managefilesCtrl"})
            .state("new_application", {url: "/new_application", templateUrl: "partials/new_app.html", controller: "newapplicationCtrl"})
            .state("change_password", {url: "/change_password", templateUrl: "partials/changepassword.html", controller: "changepasswordCtrl"})
            .state("logout", {url: "/logout", templateUrl: "partials/logout.html", controller: "logoutCtrl"})            
            .state("news_updates", {url: "/news_updates/{news_id}", templateUrl: "partials/news_updates.html", controller: "newsupdateCtrl"})
            

});