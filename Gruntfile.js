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

  // ### task runned when "git commit"
  grunt.registerTask('precommit', ['test']);

};
