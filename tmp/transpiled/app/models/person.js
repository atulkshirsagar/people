define("appkit/models/person", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var attr = DS.attr;

    var Person = DS.Model.extend({
    	fname: attr(),
    	lname: attr()
    });

    __exports__["default"] = Person;
  });