define("appkit/serializers/person", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = DS.RESTSerializer.extend({
    	primaryKey: '_id',
    });
  });