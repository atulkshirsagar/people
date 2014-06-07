define("appkit/routes/index", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      model: function() {
      	var people = [{
                      "id": 1,
                      "fname": "Atul",
                      "lname": "Kshirsagar",
                    }];
      	var m = this.store.find('person');
        return m;

       // return people;
      }
    });
  });