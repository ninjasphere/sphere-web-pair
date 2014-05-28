'use strict';

describe('Controller: PaircontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('sphereWebPairApp'));

  var PaircontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PaircontrollerCtrl = $controller('PaircontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
