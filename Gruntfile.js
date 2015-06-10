/*global module, require*/

(function () {
    'use strict';

    module.exports = function (grunt) {
        var BuildTask, oBuildTask, sBuild, sCompName;

        /*
        ** Determine which build to use
        */
        sBuild = grunt.option('build');
        sCompName = grunt.option('componentName');

        if (sBuild === 'component') {
            BuildTask = require('./grunt/build/component/' + sCompName);
        } else {
            BuildTask = require('./grunt/build/' + sBuild);
        }

        oBuildTask = new BuildTask(grunt);
    };
}());
