module.exports = function(server) {

  var Datastore = require('nedb'), db = new Datastore();

  db.insert([{
                "fname": "Atul",
                "lname": "Kshirsagar",
              },{
                "fname": "Swaminathan",
                "lname": "Saikumar",
              }]);

  // Create an API namespace, so that the root does not
  // have to be repeated for each end point.
  server.namespace('/api', function() {

    console.log("/api");

    server.get('/people', function(req, res) {
      console.log("/people");

      // var people = {
      //   "person": [{
      //             "id": 1,
      //             "fname": "Atul",
      //             "lname": "Kshirsagar",
      //           },{
      //             "id": 2,
      //             "fname": "Swaminathan",
      //             "lname": "Saikumar",
      //           }]
      // };

      var people = {};
      db.find({}, function(err, docs){
        console.log(docs);
        people.person = docs;
        res.send(people);
      });

    });

    //new
    server.post('/people', function(req, res) {
      console.log("new: " + JSON.stringify(req.body) );
      db.insert(req.body.person, function (err, newDoc) {
        res.send({person: newDoc});
      });
    });

    //save
    server.put('/people/:id', function(req, res) {
      var id = req.params.id;
      console.log("saving: " + id + " data: " + JSON.stringify(req.body) );
      db.update({ _id: id}, { $set: { fname: req.body.person.fname, lname: req.body.person.lname } }, {multi: false }, function(err, numReplaced){
        res.send();
      })
    });

    // Return fixture data for '/api/people/:id'
    server.get('/people/:id', function(req, res) {
      var id = req.params.id;
      console.log("read: " + id);
      // var person = {
      //   "person": {
      //     "id": 1,
      //     "fname": "Atul",
      //     "lname": "Kshirsagar",
      //   }
      // };

      db.findOne({ _id: id }, function (err, doc) {
        res.send({person: doc});
      });

    });

    //delete
    server.delete('/people/:id', function(req, res) {
      var id = req.params.id;
      console.log("delete: " + id);

      db.remove({ _id: id}, {}, function (err, numRemoved) {
        res.send();
      });
    });
  });
};
