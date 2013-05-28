/*
 * grunt-cortex-install
 * https://github.com/supersheep/grunt-cortex-install
 *
 * Copyright (c) 2013 supersheep
 * Licensed under the MIT license.
 */

'use strict';

var cortexInstaller = require("../lib/cortex-install");



module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('cortex-install', 'Install cortex modules.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var done = this.async();
    var options = this.options();

    var installer = new cortexInstaller(options);

    installer.install(process.cwd(),function(err){
      if(err){
          grunt.log.error(err);
          process.exit(1);
      }
      grunt.log.ok("all dependencies installed");
      done();
    });
  });

};
