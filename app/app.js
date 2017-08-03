'use strict';

// Declare app level module which depends on views, and components
var myapp = angular.module('myApp', ['ngRoute','ui.router', 'ngSanitize', 'ui.tinymce', 'ui.bootstrap', 'bootstrapLightbox']);


myapp.config(function($urlRouterProvider,$stateProvider){
    $urlRouterProvider.otherwise('/main');
    $stateProvider
    .state("dashboard",{url:"/main",templateUrl:"partials/main.html",controller:"mainCtrl"})
});

