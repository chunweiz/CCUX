/*global module, require*/

(function () {
    'use strict';

    module.exports = function (grunt) {
        var oGruntConfig;

        oGruntConfig = {};
        oGruntConfig.compName = grunt.option('componentName');
        oGruntConfig.compFolder = grunt.option('componentFolder');
        oGruntConfig.compPath = oGruntConfig.compName.replace(/\./g, '/');

        grunt.log.writeln('component name: ' + oGruntConfig.compName);
        grunt.log.writeln('component folder: ' + oGruntConfig.compFolder);
        grunt.log.writeln('component folder: ' + oGruntConfig.compPath);

        /*
        ** Perform javascript linting on all source files
        */
        oGruntConfig.jshint = (function (grunt) {
            var oConfig;

            oConfig = {
                deploy: {
                    files: {
                        cwd: '<%= compFolder %>/src',
                        src: [
                            '<%= compPath %>/**/*.js'
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
                    '<%= compFolder %>/build/**'
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
                            cwd: '<%= compFolder %>/src',
                            src: [
                                '<%= compPath %>/**/*.html',
                                '<%= compPath %>/**/*.json'
                            ],
                            dest: '<%= compFolder %>/build/',
                            filter: 'isFile'
                        },
                        {
                            expand: true,
                            cwd: '<%= compFolder %>/src',
                            src: [
                                '<%= compPath %>/**/*.js'
                            ],
                            dest: '<%= compFolder %>/build/',
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
                            cwd: '<%= compFolder %>/src',
                            src: [
                                '<%= compPath %>/**/*.js'
                            ],
                            dest: '<%= compFolder %>/build'
                        }
                    ]
                }
            };

            return oConfig;
        }(grunt));

        /*
        ** Compress HTML files
        */
        oGruntConfig.htmlmin = (function (grunt) {
            var oConfig;

            oConfig =  {
                html: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: [
                        {
                            expand: true,
                            cwd: '<%= compFolder %>/src',
                            src: [
                                '<%= compPath %>/**/*.html'
                            ],
                            dest: '<%= compFolder %>/build'
                        }
                    ]
                }
            };

            return oConfig;
        }(grunt));

        /*
        ** Merge related json files
        ** Sequence is important for routes!
        */
        oGruntConfig['merge-json'] = (function (grunt) {
            var oConfig;

            oConfig = {
                deploy: {
                    src: [
                        'ZEMOD_APP/src/nrg/module/app/manifest.json',
                        'ZEMOD_OTHERS/src/nrg/module/others/manifest.json',
                        'ZEMOD_DSHB/src/nrg/module/dashboard/manifest.json',
                        'ZEMOD_CMPGN/src/nrg/module/campaign/manifest.json',
                        'ZEMOD_QUICKPAY/src/nrg/module/quickpay/manifest.json',
                        'ZEMOD_BILLING/src/nrg/module/billing/manifest.json',
                        'ZEMOD_BUPA/src/nrg/module/bupa/manifest.json',
                        'ZEMOD_SEARCH/src/nrg/module/search/manifest.json',
                        'ZEMOD_USAGE/src/nrg/module/usage/manifest.json',
                        'ZEMOD_NNP/src/nrg/module/nnp/manifest.json',
                        '<%= compFolder %>/src/<%= compPath %>/manifest.json'
                    ],
                    dest: '<%= compFolder %>/build/<%= compPath %>/manifest.json'
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
                    files: '<%= compFolder %>/build/<%= compPath %>/**/*.json'

                }
            };

            return oConfig;
        }(grunt));

        /*
        ** Create preload for component
        */
        oGruntConfig.openui5_preload = (function (grunt) {
            var oConfig;

            oConfig = {
                deploy: {
                    options: {
                        resources: {
                            cwd: '<%= compFolder %>/src'
                        },
                        dest: '<%= compFolder %>/build'
                    },
                    components: '<%= compPath %>'
                }
            };

            return oConfig;
        }(grunt));

        grunt.initConfig(oGruntConfig);

        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-merge-json');
        grunt.loadNpmTasks('grunt-json-minify');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');
        grunt.loadNpmTasks('grunt-openui5');

        grunt.registerTask('default', [
            'jshint',
            'clean',
            'copy',
            'uglify',
            'merge-json',
            'json-minify',
            'htmlmin',
            'openui5_preload'
        ]);
    };

}());
