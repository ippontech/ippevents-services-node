
var performanceSchema = new mongoose.Schema({
  title: String,
  format: String,
  timebox: String,
  status: String,
  grade: Number,
  teasing: String,
  summary: String,
  description: String,
  goodToKnow: String,
  needs: String,
  level: String,
  maxPeople: Number,
  picture: String,
  // speakers: [{
    firstname: String,
    lastname: String,
    email: String,
    twitter: String,
    phone: String,
    biography: String,
    company: String
  // }]
});
// déclaration du modèle qui va nous permettre d'intéragir avec les données correspondant au schéma
var performanceModel = mongoose.model('performances', performanceSchema);

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
  performances: [performanceSchema],
  teasing: String,
  summary: String,
  description: String,
  picture: String
});



// déclaration du modèle qui va nous permettre d'intéragir avec les données correspondant au schéma
var eventModel = mongoose.model('events', eventSchema);



exports.addEvent = function(req, res) {
  // création d'une instance du modèle
  var newEvent = new eventModel(req.body);
  // sauvegarde de l'instance
  newEvent.save(function (err, result) {
    if (err) {
      console.log('Error :' + err);
      throw err;
      // console.log('Error :' + err);
      // res.send({'Error :' + err});
    } else {
      console.log('Success : ' + JSON.stringify(result[0]) + ' added');
      res.send(result[0]);
    }
    // On se déconnecte de MongoDB maintenant
    // mongoose.connection.close();
  });
};

// exports.findById = function(req, res) {
//     var id = req.params.id;
//     console.log('Retrieving wine: ' + id);
//     db.collection('wines', function(err, collection) {
//         collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
//             res.send(item);
//         });
//     });
// };

exports.findById = function(req, res) {
  // récupération de l'identifiant
  var id = req.params.id;

  // récupération du document
  eventModel.findById(id, function (err, result) {
    if (err) {
      console.log('Error :' + err);
      throw err;
      // res.send({'Error :' + err});
    } else {
      console.log('Success : ' + result + ' document(s) found');
      res.send(result);
    }
  });
};


exports.findAll = function(req, res) {
  eventModel.find()
  .populate('sessions')
  .exec(

    function (err, items) {
    if (err) {
      console.log('Error :' + err);
      throw err;
      // console.log('Error :' + err);
      // res.send({'Error :' + err});
    } else {
      console.log('Success : ' + items + ' found');
      res.send(items);
    }
  });
};

exports.updateEvent = function(req, res) {
  // récupération de l'identifiant
  var id = req.params.id;
  // création d'une instance du modèle
  var updateEvent = req.body;
  delete updateEvent._id;
  console.log('Updating event ' + id + ' EVENT :' + JSON.stringify(updateEvent));
  // mise à jour du document
  eventModel.findByIdAndUpdate(id, updateEvent, function (err, result) {
    if (err) {
      console.log('Error :' + err);
      throw err;
      // res.send({'Error :' + err});
    } else {
      console.log('Success : ' + result + ' document(s) updated');
      res.send(result);
    }
  });
}

exports.deleteEvent = function(req, res) {
  // récupération de l'identifiant
  var id = req.params.id;
  console.log('Deleting : ' + id);
  // suppression
  eventModel.remove({_id : id }, function (err, result) {
    if (err) {
      console.log('Error :' + err);
      throw err;
      // console.log('Error :' + err);
      // res.send({'Error :' + err});
    } else {
      console.log('Success : ' + result + ' document(s) deleted');
      res.send(req.body);
    }
  });
}