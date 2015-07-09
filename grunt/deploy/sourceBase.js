/*global module, require*/

(function () {
    'use strict';

    module.exports = function (grunt) {
        var oGruntConfig;

        oGruntConfig = {};
        oGruntConfig.eclipseProjectName = grunt.option('eclipseProjectName');
        oGruntConfig.eclipseProjectPath = grunt.option('eclipseProjectPath');

        grunt.log.writeln('eclipse project name: ' + oGruntConfig.eclipseProjectName);
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
                        '<%= eclipseProjectPath %>/<%= eclipseProjectName %>/grunt/**',
                        '<%= eclipseProjectPath %>/<%= eclipseProjectName %>/readme/**',
                        '<%= eclipseProjectPath %>/<%= eclipseProjectName %>/ZELIB/**',
                        '<%= eclipseProjectPath %>/<%= eclipseProjectName %>/.gitignore',
                        '<%= eclipseProjectPath %>/<%= eclipseProjectName %>/*.*'
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
                            src: [
                                'grunt/**',
                                'readme/**',
                                'ZELIB/bower.json',
                                '.gitignore',
                                '*.*'

                            ],
                            dest: '<%= eclipseProjectPath %>/<%= eclipseProjectName %>/',
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
