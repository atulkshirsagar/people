module.exports = function(server) {

  // Create an API namespace, so that the root does not
  // have to be repeated for each end point.
  server.namespace('/api', function() {

    console.log("/api");

    server.get('/people', function(req, res) {
      console.log("/people");

      var people = {
        "person": [{
                  "id": 1,
                  "fname": "Atul",
                  "lname": "Kshirsagar",
                },{
                  "id": 2,
                  "fname": "Swaminathan",
                  "lname": "Saikumar",
                }]
      };

      res.send(people);
    });

    // Return fixture data for '/api/people/:id'
    server.get('/people/:id', function(req, res) {
      console.log("/people/:id");
      var person = {
        "person": {
          "id": 1,
          "fname": "Atul",
          "lname": "Kshirsagar",
        }
      };

      res.send(person);
    });
  });
};
