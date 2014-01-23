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

  grunt.registerTask('install-hook', function () {
    var fs = require('fs');

    // my precommit hook is inside the repo as /hooks/pre-commit
    // copy the hook file to the correct place in the .git directory
    grunt.file.copy('hooks/pre-commit', '.git/hooks/pre-commit');

    // chmod the file to readable and executable by all
    fs.chmodSync('.git/hooks/pre-commit', '755');
  });

  grunt.task.run('install-hook');

  // ### Custom tasks

  grunt.registerTask('test', ['jshint', 'jasmine']);

  // ### task runned when "git commit"
  grunt.registerTask('precommit', ['test']);

};
