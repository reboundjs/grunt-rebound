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
        if (!grunt.file.exists(filepath) || grunt.file.isDir(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var src = grunt.file.read(filepath),
            imports,
            partials,
            require,
            deps = [],
            regex;


        // Assemple our dependancies and create require wrapper
        imports = src.match(/<link .*href=(['"])(.*).html\1.*>/gi);
        if(imports){
          imports.forEach(function(importString, index){
            deps.push('"' + importString.replace(/<link .*href=['"]?\/([^'"]*).html['"]?.*>/gi, '$1') + '"');
          });
        }
        partials = src.match(/\{\{>\s*?['"]?(.*)['"]?\s*?\}\}/gi);
        if(partials){
          partials.forEach(function(partial, index){
            console.log(partial);
            deps.push('"' + partial.replace(/\{\{>[\s*]?['"]?([^'"]*)['"]?[\s*]?\}\}/gi, '$1') + '"');
          });
        }
        require = "define( ["+ deps.join(', ')  +"], function(){\n";

        // Minify our HTMLbars template
        src = src.replace(/\s+/g, ' ').replace(/\n|(>) (<)/g, '$1$2');

        // Compile
        src = rebound.precompile(src);


        // If is a partial
        if(filepath.match(/_[^/]+\.hbs$/gi)){
          console.log(options.baseUrl);
          regex = new RegExp( options.baseUrl + '(.+/)?_([^/]+).hbs$','g');
          filepath = filepath.replace(regex, '$1$2');
          src = require + '(function(){var template = '+src+' window.Rebound.registerPartial( "'+ options.baseDest + filepath +'", template);})();\n';
        }
        else if(filepath.match(/[^/]+\.hbs/gi)){
          regex = new RegExp( options.baseUrl + '(.+/)?([^/]+).hbs$','g');
          filepath = filepath.replace(regex, '$1$2');
          src = '(function(){var template = '+src+' window.Rebound.registerTemplate( "'+ options.baseDest + filepath +'", template);})();\n';
        }
        else if(filepath.match(/[^/]+\.html/gi)){
          regex = new RegExp (options.baseUrl + '(.+/)?([^/]+).html$','g');
          filepath = filepath.replace(regex, '$1$2');
          src = '(function(){var template = '+src+' window.Rebound.registerTemplate( "'+ options.baseDest + filepath +'", template);})();\n';
        }

        src = require + src + '});';

        filepath = filepath.replace(/\.html|\.hbs/ig, '.js');
        filepath = filepath.replace(options.baseUrl, '');

        return {src: src, filepath: filepath + '.js'};

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
