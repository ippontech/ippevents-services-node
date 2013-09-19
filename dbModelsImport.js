/*
Fichier de configuration à la base de données et permettant d'importer les modèles nosql
*/

// dépendances modules
mongoose = require('mongoose'), Schema = mongoose.Schema;
// déclaration des modèles
members = require('./models/members');
events = require('./models/events');

/* connexion à la base de données */
// local
// mongoose.connect('mongodb://localhost/iedb');
// mongolab
mongoose.connect('mongodb://<user>:<pwd>@ds043338.mongolab.com:43338/iedb');

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("connection opened");
});