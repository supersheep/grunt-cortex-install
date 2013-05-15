/*
 * grunt-cortex-install
 * https://github.com/supersheep/grunt-cortex-install
 *
 * Copyright (c) 2013 supersheep
 * Licensed under the MIT license.
 */

'use strict';

var cortex_install = require("../lib/cortex-install");



module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('cortex-install', 'Install cortex modules.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var done = this.async();
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    grunt.log.debug(done)
    cortex_install.install(process.cwd(),options,function(err){
      if(err){
          grunt.log.error(err)
          process.exit(1);
      }
      grunt.log.ok("all dependencies installed");
      done();
    });
  });

};
