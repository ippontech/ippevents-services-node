
// déclaration du schéma d'une session
var sessionSchema = new mongoose.Schema({
  title: String,
  format: String,
  timebox: String,
  status: String
  // speaker : [ memberAssocie.memberSchema ],
});

// déclaration du modèle qui va nous permettre d'intéragir avec les données correspondant au schéma
var sessionModel = mongoose.model('session', sessionSchema);

// déclaration du schéma d'un événement
var eventSchema = new mongoose.Schema({
  title : String,
  dateBegin : String,
  address : [{
    title: String,
    street: String,
    postal: String,
    city: String,
    region: String,
    geolocalisation : {latitude: Number, longitude: Number}
  }],
  performances : [{
    title: String,
    format: String,
    timebox: Number,
    status: String,
    description: String,
    speakers: [{
      firstname: String,
      lastname: String,
      email: String,
      twitter: String,
      phone: String,
      biography: String
    }]
  }],
  teasing: String,
  summary: String,
  description: String,
  maxPeople: Number,
  picture: String
  // sessions: [{
  //   title: String,
  //   format: String
  // }]
  // sessions: [{ type: Schema.Types.ObjectId, ref:'session'}]
});



// déclaration du modèle qui va nous permettre d'intéragir avec les données correspondant au schéma
var eventModel = mongoose.model('events', eventSchema);

var handle = function(handler) {
  return function(err, result) {
    if (err) {
      console.log('Error :' + err);
      throw err;
    } else {
      handler(result)
    }
  }
}


exports.addEvent = function(req, res) {
  // création d'une instance du modèle
  var newEvent = new eventModel(req.body);
  // sauvegarde de l'instance
  newEvent.save(handle(function(result) {
      console.log('Success : ' + JSON.stringify(result[0]) + ' added');
      res.send(result[0]);
    // On se déconnecte de MongoDB maintenant
    // mongoose.connection.close();
  }));
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving wine: ' + id);
    db.collection('wines', handle(function(collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, handle(function(item) {
            res.send(item);
        }));
    }));
};

exports.findById = function(req, res) {
  // récupération de l'identifiant
  var id = req.params.id;

  // récupération du document
  eventModel.findById(id, handle(function(result) {
    console.log('Success : ' + result + ' document(s) found');
    res.send(result);
  }));
};


exports.findAll = function(req, res) {
  eventModel.find()
  .populate('sessions')
  .exec(handle(function(items) {
    console.log('Success : ' + items + ' found');
    res.send(items);
  }));
};

exports.updateEvent = function(req, res) {
  // récupération de l'identifiant
  var id = req.params.id;
  // création d'une instance du modèle
  var updateEvent = req.body;
  delete updateEvent._id;
  console.log('Updating event ' + id + ' EVENT :' + JSON.stringify(updateEvent));
  // mise à jour du document
  eventModel.findByIdAndUpdate(id, updateEvent, handle(function(result) {
    console.log('Success : ' + result + ' document(s) updated');
    res.send(result);
  }));
}

exports.deleteEvent = function(req, res) {
  // récupération de l'identifiant
  var id = req.params.id;
  console.log('Deleting : ' + id);
  // suppression
  eventModel.remove({_id : id }, handle(function(result) {
      console.log('Success : ' + result + ' document(s) deleted');
      res.send(req.body);
  }));
}

exports.findPerformance = function(req, res) {
    var eventId = req.params.event_id;
    var performanceId = req.params.performance_id;

    eventModel.findById(eventId, handle(function(result) {
      for (var i = 0; i < result.performances.length; i++) {
        var performance = result.performances[i];
        if (performance._id == performanceId) {
          res.send(performance);
          return;
        }
      }
      res.send(404);
    }));
}


exports.findAllSpeakers = function(req, res){

  var speakers= [];

  eventModel.find()
  .populate('sessions')
  .exec(handle(function(items) {
    for(var t = 0; t < items.length; t++){
      for (var i = 0; i < items[t].performances.length; i++) {
        var performance = items[t].performances[i];
        if(performance){
          for (var j = 0; j < performance.speakers.length; j++){
              speakers.push(performance.speakers[j]);
          }
        }
      }
    }
      res.send(speakers);
    }));
}

