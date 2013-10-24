var mongoose = require('mongoose');

// déclaration du schéma
memberSchema = new mongoose.Schema({
  firstname : String,
  lastname : String,
  email : String,
  twitter : String
});

memberSchema.static('addMember', function(req, res) {
  // création d'une instance du modèle
  var newMember = new memberModel(req.body);
  // sauvegarde de l'instance
  newMember.save(function (err, result) {
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
});

memberSchema.static('findById', function(req, res) {
  // récupération de l'identifiant
  var id = req.params.id;
  // récupération du document
  memberModel.findById(id, function (err, result) {
    if (err) {
      console.log('Error :' + err);
      throw err;
    } else {
      console.log('Success : ' + result + ' document(s) found');
      res.send(result);
    }
  });
});

memberSchema.static('findAll', function(req, res) {
  memberModel.find(null, function (err, items) {
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
});

memberSchema.static('updateMember', function(req, res) {
  // récupération de l'identifiant
  var id = req.params.id;
  console.log('Updating : ' + id);
  // création d'une instance du modèle
  // var updateMember = new memberModel(req.body);
  var updateMember = req.body;
  delete updateMember._id;

  console.log('MEMBER :' + JSON.stringify(updateMember));
  // mise à jour du document
  memberModel.findByIdAndUpdate(id, updateMember, function (err, result) {
    if (err) {
      console.log('Error :' + err);
      throw err;
      // res.send({'Error :' + err});
    } else {
      console.log('Success : ' + result + ' document(s) updated');
      res.send(result);
    }
  });
});

memberSchema.static('deleteMember',function(req, res) {
  // récupération de l'identifiant
  var id = req.params.id;
  console.log('Deleting : ' + id);
  // suppression
  memberModel.remove({_id : id }, function (err, result) {
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
});

// déclaration du modèle qui va nous permettre d'intéragir avec les données correspondant au schéma
var memberModel = module.exports = mongoose.model('members', memberSchema);
