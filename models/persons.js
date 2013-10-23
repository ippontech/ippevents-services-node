
// déclaration du schéma d'une personne
var personSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String
});

// déclaration du modèle qui va nous permettre d'intéragir avec les données correspondant au schéma
var personModel = mongoose.model('persons', personSchema);

exports.addPerson = function(req, res) {
  // création d'une instance du modèle
  var newPerson = new personModel(req.body);

  // sauvegarde de l'instance
  newPerson.save(function (err, result) {
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
  personModel.find(null, function (err, items) {
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

exports.findById = function(req, res) {
  // récupération de l'identifiant
  var id = req.params.id;
  // récupération du document
  personModel.findById(id, function (err, result) {
    if (err) {
      console.log('Error :' + err);
      throw err;
    } else {
      console.log('Success : ' + result + ' document(s) found');
      res.send(result);
    }
  });

  
};

// * Init the test data
exports.initTest = function(req, res) {
	var person = new personModel();
	person.first_name = "tom";
	person.last_name = "jerry";
	person.email = "tomandjerry@warner.us";

	person.save();
}

exports.updatePerson = function(req, res) {
  // récupération de l'identifiant
  var id = req.params.id;
  console.log('Updating : ' + id);
  // création d'une instance du modèle
  // var updateMember = new memberModel(req.body);
  var updatePerson = req.body;
  delete updatePerson._id;

  console.log('PERSON :' + JSON.stringify(updatePerson));
  // mise à jour du document
  personModel.findByIdAndUpdate(id, updatePerson, function (err, result) {
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

exports.deletePerson = function(req, res) {
  // récupération de l'identifiant
  var id = req.params.id;
  console.log('Deleting : ' + id);
  // suppression
  personModel.remove({_id : id }, function (err, result) {
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