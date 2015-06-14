/*global module, require*/

(function () {
    'use strict';

    module.exports = function (grunt) {
        var oGruntConfig;

        oGruntConfig = {};
        oGruntConfig.eclipseProjectPath = grunt.option('eclipseProjectPath');
        oGruntConfig.componentName = grunt.option('componentName');
        oGruntConfig.componentFolder = grunt.option('componentFolder');
        oGruntConfig.componentPath = oGruntConfig.componentName.replace(/\./g, '/');

        grunt.log.writeln('component name: ' + oGruntConfig.componentName);
        grunt.log.writeln('component folder: ' + oGruntConfig.componentFolder);
        grunt.log.writeln('component path: ' + oGruntConfig.componentPath);
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
                        '<%= eclipseProjectPath %>/build/<%= componentPath %>/**'
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
                            cwd: '<%= componentFolder %>/build/',
                            src: [
                                '<%= componentPath %>/**'
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
