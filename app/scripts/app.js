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


angular.module('sphereWebPairApp').factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401 || response.status === 403) {
        // handle the case where the user is not authenticated
        window.location.href='/auth/ninja';
      }
      return response || $q.when(response);
    }
  };
});

angular.module('sphereWebPairApp').config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

angular.module('sphereWebPairApp').run(function($rootScope, $resource, $timeout, $window, SERVER, LOADED, USER_LOADED) {

  var doLogin = function(user) {
    $rootScope.$broadcast(LOADED);
    $rootScope.$broadcast(USER_LOADED, user);

    $rootScope.User = user;
  };

  var doGetUser = function() {
    var userResource = $resource('/rest/v1/user', {});
    userResource.get(function(response) {
      doLogin(response['data']);
    }, function error(response) {
      window.location.href='/auth/ninja';
    });
  };

  $rootScope.AccountLink = $window.location.href.replace('api.', 'id.');
  $rootScope.LogoutLink = $window.location.href + 'auth/logout';

  $timeout(function() {
    var sessionResource = $resource('/rest/v1/auth/session_token', {});
    sessionResource.get(function(response) {
      window.sessionStorage.token = response['data']['token'];
      doGetUser();
    }, function error(response) {
      window.location.href='/auth/ninja';
    });
  }, 1000);



});
