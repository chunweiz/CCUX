/*globals module, require*/

(function () {
    'use strict';

    module.exports = function (grunt) {
        var oGruntConfig;

        oGruntConfig = {};

        //Perform javascript linting on all control javascript files
        oGruntConfig.jshint = (function (grunt) {
            var oConfig;

            oConfig = {
                control: {
                    files: {
                        cwd: 'src',
                        src: [
                            'ute/**/*.js'
                        ]
                    }
                }
            };

            return oConfig;
        }(grunt));

        //Clean control folder from build
        oGruntConfig.clean = (function (grunt) {
            var oConfig;

            oConfig = {
                control: [
                    'build/ute/**'
                ]
            };

            return oConfig;
        }(grunt));

        //Copy entire control javascript to build with suffix -dbg
        oGruntConfig.copy = (function (grunt) {
            var oConfig;

            oConfig = {
                control: {
                    files: [
                        {
                            expand: true,
                            cwd: 'src',
                            src: [
                                'ute/**/*.js'
                            ],
                            dest: 'build/',
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

        //Compile LESS files to compressed CSS files with IE10 and above compatibility
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
                control: {
                    options: {
                        plugins: [
                            oLessAutoPrefix,
                            oLessCleanCss
                        ]
                    },
                    files: {
                        'build/ute/ui/commons/themes/base/library.css': 'src/ute/ui/commons/themes/base/library.source.less',
                        'build/ute/ui/commons/themes/sap_bluecrystal/library.css': 'src/ute/ui/commons/themes/sap_bluecrystal/library.source.less'
                    }
                }
            };

            return oConfig;
        }(grunt));

        //Mangle and compress control javascript files
        oGruntConfig.uglify = (function (grunt) {
            var oConfig;

            oConfig = {
                control: {
                    files: [
                        {
                            expand: true,
                            cwd: 'src',
                            src: [
                                'ute/**/*.js'
                            ],
                            dest: 'build'
                        }
                    ]
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

        grunt.registerTask('default', [
            'jshint',
            'clean',
            'copy',
            'less',
            'uglify'
        ]);
    };

}());
