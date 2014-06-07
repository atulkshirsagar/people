var attr = DS.attr;

var Person = DS.Model.extend({
	fname: attr(),
	lname: attr()
});

export default Person;