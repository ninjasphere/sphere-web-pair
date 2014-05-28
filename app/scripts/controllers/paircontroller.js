'use strict';

angular.module('sphereWebPairApp')
  .controller('PairControllerCtrl', function ($rootScope, $scope, $resource, SERVER, USER_LOADED) {

    var PairResource = $resource(SERVER + '/rest/v1/node');

    $rootScope.IsPaired = false;

    $scope.User;

    $scope.Node;


    $scope.PairSphere = function() {
      if (this.formPair.$valid) {
        // $scope.PairSuccess();
        PairResource.save({ nodeId: $scope.Serial }, function(response) {
          if (response.node_id){
            $scope.PairSuccess(response)
          }
        });
      }
    }

    $scope.PairSuccess = function(node) {
      $rootScope.IsPaired = true;
      $scope.Node = node;
    }

    $rootScope.$on(USER_LOADED, function(event, user) {
      $scope.User = user;
    })

  });
