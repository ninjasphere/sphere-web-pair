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
  .value('SERVER', window.location.protocol + '//' + window.location.hostname  + ((window.location.port !== '80') ? ':' + window.location.port : ''))
  .value('USER_LOADED', 'userLoaded')
  .value('LOADED', 'loaded')


angular.module('sphereWebPairApp').run(function($rootScope, $resource, $timeout, SERVER, LOADED, USER_LOADED) {
  console.log("Main Run");

  var doLogin = function(user) {
    $rootScope.$broadcast(LOADED);
    $rootScope.$broadcast(USER_LOADED, user);

    $rootScope.User = user;
  }


  $timeout(function() {
    var userResource = $resource('/rest/v1/user', {});
    userResource.get(function(response) {
      doLogin(response);
    }, function error(response) {
      window.location.href='/auth/ninja';
    });
  }, 2000);



});
