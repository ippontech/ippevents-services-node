var memberAssocie = require('./members.js');

// déclaration du schéma d'une session
var sessionSchema = new mongoose.Schema({
  title : String,
  format : String,
  timebox: String,
  status: String,
  speaker : [ memberAssocie.memberSchema ],
});


// déclaration du modèle qui va nous permettre d'intéragir avec les données correspondant au schéma
var sessionModel = mongoose.model('sessions', sessionSchema);



exports.addSession = function(req, res) {
  // création d'une instance du modèle
  var newSession = new sessionModel(req.body);
  // sauvegarde de l'instance
  newSession.save(function (err, result) {
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




exports.findAll = function(req, res) {
  sessionModel.find(null, function (err, items) {
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


exports.updateSession = function(req, res) {
  // récupération de l'identifiant
  var id = req.params.id;
  console.log('Updating : ' + id);
  // création d'une instance du modèle
  // var updateSession = new sessionModel(req.body);
  var updateSession = req.body;
  delete updateSession._id;

  console.log('EVENT :' + JSON.stringify(updateSession));
  // mise à jour du document
  sessionModel.findByIdAndUpdate(id, updateSession, function (err, result) {
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

exports.deleteSession = function(req, res) {
  // récupération de l'identifiant
  var id = req.params.id;
  console.log('Deleting : ' + id);
  // suppression
  sessionModel.remove({_id : id }, function (err, result) {
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





