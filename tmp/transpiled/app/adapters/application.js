define("appkit/adapters/application", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = DS.RESTAdapter.extend({
    	namespace: 'api'
    });
  });