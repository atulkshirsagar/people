export default Ember.Route.extend({
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
