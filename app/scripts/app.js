'use strict';

angular
  .module('sphereWebPairApp', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'hmTouchEvents'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


angular.module('sphereWebPairApp')
  .value('SERVER', window.location.protocol + '//' + window.location.hostname)
  .value('USER_LOADED', 'userLoaded')
  .value('LOADED', 'loaded')


angular.module('sphereWebPairApp').run(function($rootScope, $resource, $timeout, SERVER, LOADED, USER_LOADED) {


  var doLogin = function(user) {
    $rootScope.$broadcast(LOADED);
    $rootScope.$broadcast(USER_LOADED, user);

    $rootScope.User = user;
  }

  $timeout(function() {
    doLogin({"user_id":"80eykz","site_id":"75e62f02-1d40-4a0a-86e4-f705cff14f36","node_id":"HELLO1234568888YYY", "name": "Theo"});

  }, 1000);


  var userResource = $resource('/rest/v1/user', {});
  userResource.get(function(response) {
    doLogin(response);

  });



});
