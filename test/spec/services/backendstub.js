'use strict';

describe('Service: Backendstub', function () {

  // load the service's module
  beforeEach(module('sphereWebPairApp'));

  // instantiate service
  var Backendstub;
  beforeEach(inject(function (_Backendstub_) {
    Backendstub = _Backendstub_;
  }));

  it('should do something', function () {
    expect(!!Backendstub).toBe(true);
  });

});
