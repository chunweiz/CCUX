/*global module, require*/

(function () {
    'use strict';

    module.exports = function (grunt) {
        var BuildTask, oBuildTask, sBuild;

        sBuild = grunt.option('build') || 'project';

        if (grunt.option('dev')) {
            sBuild = 'dev/' + sBuild;
        }

        BuildTask = require('./grunt/build/' + sBuild);
        oBuildTask = new BuildTask(grunt);
    };
}());
