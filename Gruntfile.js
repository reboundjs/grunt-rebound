/*
 * grunt-rebound
 * https://github.com/adammiller1/grunt-rebound
 *
 * Copyright (c) 2014 Adam Miller
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    rebound: {
      plaintext: {
        options: {
        },
        files: {
          'tmp/plaintext.js': ['test/fixtures/plaintext.hbs']
        }
      },
      dom: {
        options: {
        },
        files: {
          'tmp/dom.js': ['test/fixtures/dom.hbs',]
        }
      },
      concat: {
        options: {
        },
        files: {
          'tmp/concat.js': [
            'test/fixtures/dom.hbs',
            'test/fixtures/plaintext.hbs',
            'test/fixtures/_partial.hbs'
          ]
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'rebound', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
