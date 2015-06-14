/*global module, require*/

(function () {
    'use strict';

    module.exports = function (grunt) {
        var oGruntConfig;

        oGruntConfig = {};
        oGruntConfig.eclipseProjectPath = grunt.option('eclipseProjectPath');
        oGruntConfig.baseName = grunt.option('baseName');
        oGruntConfig.baseFolder = grunt.option('baseFolder');
        oGruntConfig.basePath = oGruntConfig.baseName.replace(/\./g, '/');

        grunt.log.writeln('base name: ' + oGruntConfig.baseName);
        grunt.log.writeln('base folder: ' + oGruntConfig.baseFolder);
        grunt.log.writeln('base path: ' + oGruntConfig.basePath);
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
                        '<%= eclipseProjectPath %>/WebContent/build/<%= basePath %>/**'
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
                            cwd: '<%= baseFolder %>/build/',
                            src: [
                                '<%= basePath %>/**'
                            ],
                            dest: '<%= eclipseProjectPath %>/WebContent/build/',
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
