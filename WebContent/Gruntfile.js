/*globals module, require*/

(function () {
    'use strict';

    module.exports = function (grunt) {
        var BuildTask, oBuildTask, sBuild;

        sBuild = grunt.option('build') || 'deploy';

        if (sBuild === 'deploy') {
            BuildTask = require('./grunt/build/control');
            oBuildTask = new BuildTask(grunt);

            BuildTask = require('./grunt/build/application');
            oBuildTask = new BuildTask(grunt);

        } else {
            BuildTask = require('./grunt/build/' + sBuild);
            oBuildTask = new BuildTask(grunt);
        }
    };
}());
