var Members = require('../models/members');
var Persons = require('../models/persons');
var Events = require('../models/events');

module.exports = function(server){
  // relatifs au module members
  server.get('/members', Members.findAll);
  server.get('/members/:id', Members.findById);
  server.post('/members', Members.addMember);
  server.put('/members/:id', Members.updateMember);
  server.delete('/members/:id', Members.deleteMember);

  // relatifs au module persons
  server.get('/persons', Persons.findAll);
  server.get('/person/:id', Persons.findById);
  server.post('/person', Persons.addPerson);
  //server.get('/personsInit', persons.initTest);
  server.put('/person/:id', Persons.updatePerson);
  //server.get('/deletePerson/:id', persons.deletePerson);
  server.delete('/person/:id', Persons.deletePerson);

  // relatifs au module events
  server.get('/events', Events.findAll);
  server.get('/events/:id', Events.findById);
  server.post('/events', Events.addEvent);
  server.put('/events/:id', Events.updateEvent);
  server.delete('/events/:id', Events.deleteEvent);

  server.get('/events/:event_id/performances/:performance_id', Events.findPerformance);

  server.get('/findAllSpeakers',Events.findAllSpeakers);

  server.get('/getPerformancesBySpeaker/:nom/:prenom',events.getPerformancesBySpeaker);

};