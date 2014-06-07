export default Ember.Route.extend({
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
