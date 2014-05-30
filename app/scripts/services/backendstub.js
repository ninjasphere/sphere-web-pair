

(function(ng) {

  if (window.location.hostname.indexOf('0.0.0.0') >= 0 || window.location.hostname === 'localhost') {

    console.log("==== STUBBED BACKEND ====");

    angular.module('sphereWebPairApp')
      .config(function($provide) {
        $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
      })
      .run(function($httpBackend, $timeout, SERVER) {
        console.log("Setting up Stubs on ", SERVER);
        var user = {
          'user_id':'80eykz',
          'site_id':'75e62f02-1d40-4a0a-86e4-f705cff14f36',
          'node_id':'HELLO1234568888YYY',
          'name': 'Theo'};

        var nodes = {
            nodes: [
              { node_id: '123456789', name: 'My Dev Kit 1'},
              { node_id: '123456789', name: ''}
            ]
        };

        $httpBackend.whenGET('/rest/v1/user').respond(function() {
          return [200, user];
        });

        $httpBackend.whenGET('/rest/v1/node').respond(nodes);

        $httpBackend.whenDELETE('/rest/v1/node/123456789').respond(function() {
          return [200, { success: true }];
        })

        $httpBackend.whenPOST('/rest/v1/node').respond(function(method, url, data) {

          return [200, { node_id: '123456789', metadata: { local_ip: 'www.google.com'}, code: 32, message: "Could not find Spheramid"}];
        })

      $httpBackend.whenGET(/^\/views\//).passThrough();

    });

  }



})(angular);
