define("appkit/adapters/application", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = DS.RESTAdapter.extend({
    	namespace: 'api'
    });
  });
define("appkit/app", 
  ["ember/resolver","ember/load-initializers","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Resolver = __dependency1__["default"];
    var loadInitializers = __dependency2__["default"];

    var App = Ember.Application.extend({
      modulePrefix: 'appkit', // TODO: loaded via config
      Resolver: Resolver
    });

    loadInitializers(App, 'appkit');

    __exports__["default"] = App;
  });
define("appkit/components/pretty-color", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Component.extend({
      classNames: ['pretty-color'],
      attributeBindings: ['style'],
      style: function(){
        return 'color: ' + this.get('name') + ';';
      }.property('name')
    });
  });
define("appkit/components/template-less", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Component.extend({
      classNames: ['look-ma-no-template'],
      tagName: ['span']
    });
  });
define("appkit/helpers/reverse-word", 
  ["exports"],
  function(__exports__) {
    "use strict";
    // Please note that Handlebars helpers will only be found automatically by the
    // resolver if their name contains a dash (reverse-word, translate-text, etc.)
    // For more details: http://stefanpenner.github.io/ember-app-kit/guides/using-modules.html

    __exports__["default"] = Ember.Handlebars.makeBoundHelper(function(word) {
      return word.split('').reverse().join('');
    });
  });
define("appkit/initializers/inject-store-into-component", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = {
      name: "injectStoreIntoComponent",
      after: "store",

      initialize: function(container, application) {
        container.typeInjection('component', 'store', 'store:main');
      }
    };
  });
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
define("appkit/router", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

    Router.map(function() {
      this.route('component-test');
      this.route('helper-test');
      this.resource('people', function(){
        this.resource('person', {path: '/:person_id'}, function(){
            this.route('edit', {path: '/edit'});
        });
        this.route('new');
      });
    });

    __exports__["default"] = Router;
  });
define("appkit/routes/component-test", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      model: function() {
        return ['purple', 'green', 'orange'];
      }
    });
  });
define("appkit/routes/helper-test", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      model: function() {
        return {
          name: "rebmE"
        };
      }
    });
  });
define("appkit/routes/index", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      model: function() {
        var m = this.store.find('person');
        return m;
      },
      actions: {
        edit: function(record){
          Em.Logger.info("action:edit " + record.id);
          record.set("isEditing", true);
        },
        cancel: function(record){
          if(record.get('isNew')){
            //remove from store
            record.deleteRecord();
          }else{
            Em.Logger.info("action:cancel " + record.id);
            // record.reload();
            record.rollback();
            record.set("isEditing", false);
          }
        },
        delete: function(record){
          bootbox.confirm("confirm: deleting " + record.get('fname') + ", " + record.get('lname'), function(response){
            if(response){
              Em.Logger.info("deleting");
              //delete
              record.deleteRecord();
              Em.Logger.info("record deleted: " + record.get("isDeleted") );
              record.save();
            }
          });
        },
        save: function(record){
          // if(record.get("isNew")){
          //   //create new record
          //   record.save();
          // }else 
          if(record.get("isNew") || record.get("isDirty")){
            Em.Logger.info("saving");
            record.save().then(function(res){
              record.set("isEditing", false);
              Em.Logger.info("saved");
            }).catch(function(res){
              if(res.status === 200){
                record.set("isEditing", false);
                Em.Logger.info("saved");
              }else{
                Em.Logger.error("failed to save");
              }
            });
          }

        },
        add: function(){
          var record = this.store.createRecord('person',{
            fname: "first",
            lname: "last",
            isEditing: true
          });

          Em.Logger.info("isNew: " + record.get('isNew'));
        }
      }
    });
  });
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
define("appkit/serializers/person", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = DS.RESTSerializer.extend({
    	primaryKey: '_id',
    });
  });
define("appkit/utils/ajax", 
  ["exports"],
  function(__exports__) {
    "use strict";
    /* global ic */
    __exports__["default"] = function ajax(){
      return ic.ajax.apply(null, arguments);
    }
  });
//# sourceMappingURL=app.js.map