'use strict';

angular
  .module('sphereWebPairApp', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'hmTouchEvents',
    'angular-ladda',
    'ngDialog'
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


angular.module('sphereWebPairApp').run(function($rootScope, $resource, $timeout, $window, SERVER, LOADED, USER_LOADED) {

  var doLogin = function(user) {
    $rootScope.$broadcast(LOADED);
    $rootScope.$broadcast(USER_LOADED, user);

    $rootScope.User = user;
  }


  $rootScope.AccountLink = $window.location.href.replace('api.', 'id.');
  $rootScope.LogoutLink = $window.location.href.replace('api.', 'id.') + 'auth/logout';


  $timeout(function() {
    var userResource = $resource('/rest/v1/user', {});
    userResource.get(function(response) {
      doLogin(response);
    }, function error(response) {
      window.location.href='/auth/ninja';
    });
  }, 1000);



});
