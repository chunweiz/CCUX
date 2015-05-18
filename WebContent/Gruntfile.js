/*global module, require*/

(function () {
    'use strict';

    module.exports = function (grunt) {
        var BuildTask, oBuildTask, sBuild;

        sBuild = grunt.option('build') || 'deploy';
        BuildTask = require('./grunt/build/' + sBuild);
        oBuildTask = new BuildTask(grunt);
    };
}());
