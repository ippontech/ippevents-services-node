'use strict';
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    jasmine : {
      src : 'models/**/*.js',
      options : {
        specs : 'spec/**/*.js'
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        // 'src/**/*.js',
        'spec/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    }
  });

  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('populate', 'populate the database', function() {
    console.log("populating db...");

    require('./models/events');

    // async mode
    var done = this.async();

    var mongoose = require('mongoose');

    /* connexion à la base de données */
    // local
    mongoose.connect('mongodb://localhost/iedb');
    var db = mongoose.connection;

    db.once('open', function () { 
      console.log("connection opened");  

      // création d'une instance du modèle
      var newEvent = new eventModel({"title":"title2","dateBegin":"2014-01-24T05:00:00.000Z","dateEnd":"2014-01-25T05:00:00.000Z","teasing":"accroche1","summary":"desc1","picture":"img1"});
      newEvent.save();/*handle(function(result) {
        console.log('Success : ' + JSON.stringify(result[0]) + ' added');
      }));*/

      console.log("added entry");

      db.close(done);
    });
  });

};
