
module.exports = function(server){
  // relatifs au module members
  server.get('/members', members.findAll);
  server.get('/members/:id', members.findById);
  server.post('/members', members.addMember);
  server.put('/members/:id', members.updateMember);
  server.delete('/members/:id', members.deleteMember);

  // relatifs au module persons
  server.get('/persons', persons.findAll);
  server.get('/person/:id', persons.findById);
  server.post('/person', persons.addPerson);
  //server.get('/personsInit', persons.initTest);
  server.put('/person/:id', persons.updatePerson);
  //server.get('/deletePerson/:id', persons.deletePerson);
  server.delete('/person/:id', persons.deletePerson);

  // relatifs au module events
  server.get('/events', events.findAll);
  server.get('/events/:id', events.findById);
  server.post('/events', events.addEvent);
  server.put('/events/:id', events.updateEvent);
  server.delete('/events/:id', events.deleteEvent);

  server.get('/events/:event_id/performances/:performance_id', events.findPerformance);

};