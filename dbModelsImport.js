/*
Fichier de configuration à la base de données et permettant d'importer les modèles nosql
*/

// dépendances modules
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// déclaration des modèles
require('./models/members');
require('./models/events');
require('./models/persons');

/* connexion à la base de données */
// local
mongoose.connect('mongodb://localhost/iedb');

// mongolab
// mongoose.connect('mongodb://<user>:<password>@<database>');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("connection opened");
});