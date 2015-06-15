/*global module, require*/

(function () {
    'use strict';

    module.exports = function (grunt) {
        var oGruntConfig;

        oGruntConfig = {};
        oGruntConfig.baseFolder = grunt.option('baseFolder');

        grunt.log.writeln('base folder: ' + oGruntConfig.baseFolder);

        /*
        ** Perform javascript linting on all source files
        */
        oGruntConfig.jshint = (function (grunt) {
            var oConfig;

            oConfig = {
                deploy: {
                    files: {
                        cwd: '<%= baseFolder %>/src',
                        src: [
                            'nrg/base/**/*.js'
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
                    '<%= baseFolder %>/build/**'
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
                            cwd: '<%= baseFolder %>/src/nrg/base',
                            src: [
                                'asset/css/font/**',
                                'asset/img/**/*.png',
                                'component/**/*.json'
                            ],
                            dest: '<%= baseFolder %>/build/nrg/base/',
                            filter: 'isFile'
                        },
                        {
                            expand: true,
                            cwd: '<%= baseFolder %>/src',
                            src: [
                                'nrg/base/**/*.js'
                            ],
                            dest: '<%= baseFolder %>/build/',
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
        ** Compress all json files
        */
        oGruntConfig['json-minify'] = (function (grunt) {
            var oConfig;

            oConfig = {
                deploy: {
                    files: '<%= baseFolder %>/build/nrg/base/**/*.json'

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
                            cwd: '<%= baseFolder %>/src',
                            src: [
                                'nrg/base/**/*.js'
                            ],
                            dest: '<%= baseFolder %>/build'
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
                        '<%= baseFolder %>/build/nrg/base/asset/css/base.css': '<%= baseFolder %>/src/nrg/base/asset/css/base.less'
                    }
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
        grunt.loadNpmTasks('grunt-json-minify');

        grunt.registerTask('default', [
            'jshint',
            'clean',
            'copy',
            'less',
            'uglify',
            'json-minify'
        ]);
    };

}());
