define("appkit/routes/person", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      model: function(params) {
        return this.store.find('person', params.person_id);
      }
    });
  });