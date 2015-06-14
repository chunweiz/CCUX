/*global module, require*/

(function () {
    'use strict';

    module.exports = function (grunt) {
        var oGruntConfig;

        oGruntConfig = {};
        oGruntConfig.eclipseProjectPath = grunt.option('eclipseProjectPath');
        oGruntConfig.controlName = grunt.option('controlName');
        oGruntConfig.controlFolder = grunt.option('controlFolder');
        oGruntConfig.controlPath = oGruntConfig.controlName.replace(/\./g, '/');

        grunt.log.writeln('control name: ' + oGruntConfig.controlName);
        grunt.log.writeln('control folder: ' + oGruntConfig.controlFolder);
        grunt.log.writeln('control path: ' + oGruntConfig.controlPath);
        grunt.log.writeln('eclipse project path: ' + oGruntConfig.eclipseProjectPath);

        /*
        ** Clean up build folder in eclipse project
        */
        oGruntConfig.clean = (function (grunt) {
            var oConfig;

            oConfig = {
                deploy: {
                    options: {
                        force: true
                    },
                    src: [
                        '<%= eclipseProjectPath %>/build/<%= controlPath %>/**'
                    ]
                }
            };

            return oConfig;
        }(grunt));

        /*
        ** Copy relevant files files to build.
        */
        oGruntConfig.copy = (function (grunt) {
            var oConfig;

            oConfig = {
                deploy: {
                    files: [
                        {
                            expand: true,
                            cwd: '<%= controlFolder %>/build/',
                            src: [
                                '<%= controlPath %>/**'
                            ],
                            dest: '<%= eclipseProjectPath %>/build/',
                            filter: 'isFile'
                        }
                    ]
                }
            };

            return oConfig;
        }(grunt));

        grunt.initConfig(oGruntConfig);

        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-copy');

        grunt.registerTask('default', [
            'clean',
            'copy'
        ]);
    };

}());
