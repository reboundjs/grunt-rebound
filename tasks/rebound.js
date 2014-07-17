/*
 * grunt-rebound
 * https://github.com/adammiller1/grunt-rebound
 *
 * Copyright (c) 2014 Adam Miller
 * Licensed under the MIT license.
 */

'use strict';

var rebound = require('reboundjs');

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
        console.log(filepath);
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var src = grunt.file.read(filepath);
        // Minify our HTMLbars template
        src = src.replace(/\s+/g, ' ').replace(/\n|(>) (<)/g, '$1$2');
        // Compile
        src = rebound.precompile(src);

        // If is a partial
        if(filepath.match(/_[^/]+\.hbs$/gi)){
          src = '(function(){var template = '+src+' window.Rebound.registerPartial( "'+filepath.replace(/.*\/_([^/]+)\.hbs$/gi, '$1')+'", template);})();';
        }
        else{
          src = '(function(){var template = '+src+' window.Rebound.registerTemplate( "'+ f.dest.replace(/.*\/([^/]+)\.js$/gi, '$1')+'", template);})();';
        }

        return src;

      }).join('');

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
