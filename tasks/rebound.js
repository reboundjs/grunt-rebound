/*
 * grunt-rebound
 * https://github.com/adammiller1/grunt-rebound
 *
 * Copyright (c) 2014 Adam Miller
 * Licensed under the MIT license.
 */

'use strict';

var precompile = require('reboundjs').default;

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('rebound', 'Easily compile your Rebound templates using Grunt.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      srcRoot: '',
      destRoot: ''
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).

        if (!grunt.file.exists(filepath) || grunt.file.isDir(filepath)) {
          //grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var src = grunt.file.read(filepath),
            regex, res;

        // If is a partial
        if(filepath.match(/_[^/]+\.hbs$/gi)){
          regex = new RegExp( options.baseUrl + '(.+/)?_([^/]+).hbs$','g');
          filepath = filepath.replace(regex, '$1$2');
        }
        else if(filepath.match(/[^/]+\.hbs/gi)){
          regex = new RegExp( options.baseUrl + '(.+/)?([^/]+).hbs$','g');
          filepath = filepath.replace(regex, '$1$2');
        }
        else if(filepath.match(/[^/]+\.html/gi)){
          regex = new RegExp (options.baseUrl + '(.+/)?([^/]+).html$','g');
          filepath = filepath.replace(regex, '$1$2');
        }

        // Compile
        res = precompile(src, {
          name: filepath,
          baseDest: options.baseDest,
          baseUrl: options.baseUrl
        });


        filepath = filepath.replace(/\.html|\.hbs/ig, '.js');
        filepath = filepath.replace(options.baseUrl, '');

        return {src: res.src, filepath: filepath + '.js'};

      }).map(function(comp){

        grunt.file.write(f.dest + '/' + comp.filepath, comp.src);
        grunt.log.writeln('File "' + f.dest + '/' + comp.filepath + '" created.');

      });


      // Write the destination file.
      // grunt.file.write(f.dest, src);

      // Print a success message.
    });
  });

};
