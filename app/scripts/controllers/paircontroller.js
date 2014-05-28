'use strict';

angular.module('sphereWebPairApp')
  .controller('PairControllerCtrl', function ($rootScope, $scope, $timeout, $resource, ngDialog, SERVER, USER_LOADED) {

    var PairResource = $resource('/rest/v1/node');

    $rootScope.IsPaired = false;

    $scope.User;

    $scope.Node;

    $scope.Serial;

    $scope.Pairing = false;

    $scope.PairSphere = function() {
      if (this.formPair.$valid) {
        $scope.Pairing = true;
        PairResource.save({ nodeId: this.Serial }, function success(response) {
          $timeout(function() {
            $scope.Pairing = false;
            if (response.node_id){
              $scope.PairSuccess(response)
            }
          }, 2000);
        }, function error(response) {
          $timeout(function() {
            $scope.Pairing = false;

            ngDialog.open({
              template: '/views/modalpairerror.html',
              scope: $scope,
              data: JSON.stringify(response.data),
              showClose: true
            })

          })
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
