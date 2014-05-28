

(function(ng) {

  if (window.location.hostname.indexOf('0.0.0.0') >= 0 || window.location.hostname === 'localhost') {

    console.log("==== STUBBED BACKEND ====");

    angular.module('sphereWebPairApp')
      .config(function($provide) {
        $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
      })
      .run(function($httpBackend, SERVER) {
        console.log("Setting up Stubs on ", SERVER);
        var user = {
          'user_id':'80eykz',
          'site_id':'75e62f02-1d40-4a0a-86e4-f705cff14f36',
          'node_id':'HELLO1234568888YYY',
          'name': 'Theo'};

        $httpBackend.whenGET('/rest/v1/user').respond(function() {
          return [200, user];
        });

        $httpBackend.whenPOST('/rest/v1/node').respond(function(method, url, data) {
          console.log("Fake Node", data);
          return [200, { node_id: '123456789', local_ip: 'www.google.com'}];
        })

      $httpBackend.whenGET(/^\/views\//).passThrough();

    });

  }



})(angular);
