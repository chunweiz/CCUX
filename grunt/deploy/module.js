/*global module, require*/

(function () {
    'use strict';

    module.exports = function (grunt) {
        var oGruntConfig;

        oGruntConfig = {};
        oGruntConfig.eclipseProjectPath = grunt.option('eclipseProjectPath');
        oGruntConfig.moduleName = grunt.option('moduleName');
        oGruntConfig.moduleFolder = grunt.option('moduleFolder');
        oGruntConfig.modulePath = oGruntConfig.moduleName.replace(/\./g, '/');

        grunt.log.writeln('module name: ' + oGruntConfig.moduleName);
        grunt.log.writeln('module folder: ' + oGruntConfig.moduleFolder);
        grunt.log.writeln('module path: ' + oGruntConfig.modulePath);
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
                        '<%= eclipseProjectPath %>/build/<%= modulePath %>/**'
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
                            cwd: '<%= moduleFolder %>/build/',
                            src: [
                                '<%= modulePath %>/**'
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
