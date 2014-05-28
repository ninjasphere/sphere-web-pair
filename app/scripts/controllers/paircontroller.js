'use strict';

angular.module('sphereWebPairApp')
  .controller('PairControllerCtrl', function ($rootScope, $scope, $resource, SERVER, USER_LOADED) {

    var PairResource = $resource(SERVER + '/rest/v1/node');

    $rootScope.IsPaired = false;

    $scope.User;


    $scope.PairSphere = function() {
      if (this.formPair.$valid) {
        PairResource.save({ nodeId: $scope.Serial }, function(response) {
          if (response.node_id){
            $scope.PairSuccess()
          }
        });
      }
    }

    $scope.PairSuccess = function() {
      $rootScope.IsPaired = true;
    }

    $rootScope.$on(USER_LOADED, function(event, user) {
      $scope.User = user;
    })

  });
