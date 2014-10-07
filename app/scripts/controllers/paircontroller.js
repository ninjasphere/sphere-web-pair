'use strict';

angular.module('sphereWebPairApp')
  .controller('PairControllerCtrl', function ($rootScope, $scope, $timeout, $resource, ngDialog, SERVER, USER_LOADED) {

    var NodeResource = $resource('/rest/v1/node/:nodeId', { nodeId: '@node_id' });

    $rootScope.IsPaired = false;

    $scope.User;

    $scope.Node;

    $scope.Nodes = [];

    $scope.Serial;

    $scope.Pairing = false;

    /**
     * Loads all spheres / dev kits
     */
    $scope.LoadSpheres = function() {

      NodeResource.get(function(response) {
        $scope.Nodes = response.data;
      })
    }

    /**
     * Pairs a new sphere / dev kit
     */
    $scope.PairSphere = function() {
      if (this.formPair.$valid) {
        $scope.Pairing = true;
        NodeResource.save({ nodeId: this.Serial }, function success(response) {
          $timeout(function() {
            $scope.Pairing = false;
            if (response.data.node_id){
              $scope.PairSuccess(response.data)
            }
          }, 2000);
        }, function error(response) {
          $timeout(function() {
            $scope.Pairing = false;

            response.data.title = "Pairing Error";

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

    $scope.ConfirmNodeDelete = function(node) {
      ngDialog.open({
        template: '/views/modalnodedelete.html',
        scope: $scope,
        data: JSON.stringify(node),
        showClose: true
      });
    };

    $scope.DeleteNode = function(node) {
      NodeResource.delete({ nodeId: node.node_id}, function(response) {
        if (response) {
          ngDialog.closeAll();
          $scope.LoadSpheres();
        }
      }, function(response) {

        response.data.title = "Unpair Error";

        ngDialog.open({
          template: '/views/modalpairerror.html',
          scope: $scope,
          data: JSON.stringify(response.data),
          showClose: true
        })
      })
    }

    $rootScope.$on(USER_LOADED, function(event, user) {
      $scope.User = user;
      $scope.LoadSpheres();
    })

  });
