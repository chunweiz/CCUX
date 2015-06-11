/*global module, require*/

(function () {
    'use strict';

    module.exports = function (grunt) {
        var oGruntConfig;

        oGruntConfig = {};
        oGruntConfig.controlLibrary = grunt.option('controlLibrary');
        oGruntConfig.controlFolder = grunt.option('controlFolder');
        oGruntConfig.controlLibPath = oGruntConfig.controlLibrary.replace(/\./g, '/');

        grunt.log.writeln('control folder: ' + oGruntConfig.controlFolder);
        grunt.log.writeln('control library: ' + oGruntConfig.controlLibrary);
        grunt.log.writeln('control library path: ' + oGruntConfig.controlLibPath);

        /*
        ** Perform javascript linting on all source files
        */
        oGruntConfig.jshint = (function (grunt) {
            var oConfig;

            oConfig = {
                deploy: {
                    files: {
                        cwd: '<%= controlFolder %>/src',
                        src: [
                            '<%= controlLibPath %>/**/*.js'
                        ]
                    }
                }
            };

            return oConfig;
        }(grunt));

        /*
        ** Clean up build folder
        */
        oGruntConfig.clean = (function (grunt) {
            var oConfig;

            oConfig = {
                deploy: [
                    '<%= controlFolder %>/build/<%= controlLibPath %>/**'
                ]
            };

            return oConfig;
        }(grunt));

        /*
        ** Copy relevant files files to build.
        ** Javascript files will be copied with suffix -dbg
        */
        oGruntConfig.copy = (function (grunt) {
            var oConfig;

            oConfig = {
                deploy: {
                    files: [
                        {
                            expand: true,
                            cwd: '<%= controlFolder %>/src',
                            src: [
                                '<%= controlLibPath %>/**/*.js'
                            ],
                            dest: '<%= controlFolder %>/build/',
                            filter: 'isFile',
                            rename: function (dest, src) {
                                var aSrc = src.split('.');
                                aSrc[0] = aSrc[0] + '-dbg';
                                dest = dest + aSrc.join('.');
                                return dest;
                            }
                        }
                    ]
                }
            };

            return oConfig;
        }(grunt));

        /*
        ** Mangle and compress javascript files
        */
        oGruntConfig.uglify = (function (grunt) {
            var oConfig;

            oConfig = {
                deploy: {
                    files: [
                        {
                            expand: true,
                            cwd: '<%= controlFolder %>/src',
                            src: [
                                '<%= controlLibPath %>/**/*.js'
                            ],
                            dest: '<%= controlFolder %>/build'
                        }
                    ]
                }
            };

            return oConfig;
        }(grunt));

        /*
        ** Compile LESS files to compressed CSS files with IE10 and above compatibility
        */
        oGruntConfig.less = (function (grunt) {
            var oConfig, LessPluginAutoPrefix, LessPluginCleanCss, oLessAutoPrefix, oLessCleanCss;

            LessPluginAutoPrefix = require('less-plugin-autoprefix');
            LessPluginCleanCss = require('less-plugin-clean-css');

            oLessAutoPrefix = new LessPluginAutoPrefix({
                browsers: [
                    'ie >= 10'
                ]
            });

            oLessCleanCss = new LessPluginCleanCss({
                advanced: true
            });

            oConfig = {
                deploy: {
                    options: {
                        plugins: [
                            oLessAutoPrefix,
                            oLessCleanCss
                        ]
                    },
                    files: {
                        '<%= controlFolder %>/build/<%= controlLibPath %>/themes/base/library.css': '<%= controlFolder %>/src/<%= controlLibPath %>/themes/base/library.less',
                        '<%= controlFolder %>/build/<%= controlLibPath %>/themes/sap_bluecrystal/library.css': '<%= controlFolder %>/src/<%= controlLibPath %>/themes/sap_bluecrystal/library.less'
                    }
                }
            };

            return oConfig;
        }(grunt));

        /*
        ** Create preload for control library
        */
        oGruntConfig.openui5_preload = (function (grunt) {
            var oConfig;

            oConfig = {
                lib: {
                    options: {
                        resources: {
                            cwd: '<%= controlFolder %>/src',
                            src: '<%= controlLibPath %>/**'
                        },
                        dest: '<%= controlFolder %>/build'
                    },
                    libraries: true
                }
            };

            return oConfig;
        }(grunt));

        grunt.initConfig(oGruntConfig);

        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-openui5');

        grunt.registerTask('default', [
            'jshint',
            'clean',
            'copy',
            'less',
            'uglify',
            'openui5_preload'
        ]);
    };

}());
