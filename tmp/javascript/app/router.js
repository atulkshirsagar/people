var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('component-test');
  this.route('helper-test');
  this.resource('people', function(){
  	// this.resource('person', {path: '/:person_id'});
  });

 //  , function(){
	// this.route('edit');	
	// this.route('new');
 //  });
});

export default Router;
