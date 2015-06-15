/*global module, require*/

(function () {
    'use strict';

    module.exports = function (grunt) {
        var oGruntConfig;

        oGruntConfig = {};
        oGruntConfig.moduleName = grunt.option('moduleName');
        oGruntConfig.moduleFolder = grunt.option('moduleFolder');
        oGruntConfig.modulePath = oGruntConfig.moduleName.replace(/\./g, '/');

        grunt.log.writeln('module name: ' + oGruntConfig.moduleName);
        grunt.log.writeln('module folder: ' + oGruntConfig.moduleFolder);
        grunt.log.writeln('module path: ' + oGruntConfig.modulePath);

        /*
        ** Perform javascript linting on all source files
        */
        oGruntConfig.jshint = (function (grunt) {
            var oConfig;

            oConfig = {
                deploy: {
                    files: {
                        cwd: '<%= moduleFolder %>/src/<%= modulePath %>',
                        src: [
                            'view/**/*.js'
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
                    '<%= moduleFolder %>/build/<%= modulePath %>/**'
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
                            cwd: '<%= moduleFolder %>/src/<%= modulePath %>',
                            src: [
                                'data/**/*.json',
                                'manifest.json'
                            ],
                            dest: '<%= moduleFolder %>/build/<%= modulePath %>/',
                            filter: 'isFile'
                        },
                        {
                            expand: true,
                            cwd: '<%= moduleFolder %>/src/<%= modulePath %>',
                            src: [
                                'view/**/*.js'
                            ],
                            dest: '<%= moduleFolder %>/build/<%= modulePath %>/',
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
                    files: '<%= moduleFolder %>/build/<%= modulePath %>/**/*.json'

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
                            cwd: '<%= moduleFolder %>/src/<%= modulePath %>',
                            src: [
                                'view/<%= buildModule %>/**/*.js'
                            ],
                            dest: '<%= moduleFolder %>/build/<%= modulePath %>'
                        }
                    ]
                }
            };

            return oConfig;
        }(grunt));

        /*
        ** Compress XML files
        */
        oGruntConfig.htmlmin = (function (grunt) {
            var oConfig;

            oConfig =  {
                xml: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true,
                        preventAttributesEscaping: true,
                        caseSensitive: true,
                        keepClosingSlash: true
                    },
                    files: [
                        {
                            expand: true,
                            cwd: '<%= moduleFolder %>/src/<%= modulePath %>',
                            src: [
                                'view/**/*.xml',
                                'data/**/*.xml'
                            ],
                            dest: '<%= moduleFolder %>/build/<%= modulePath %>'
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
                        '<%= moduleFolder %>/build/<%= modulePath %>/asset/css/module.css': '<%= moduleFolder %>/src/<%= modulePath %>/asset/css/module.less'
                    }
                }
            };

            return oConfig;
        }(grunt));

        /*
        ** Merge all properties files into relevant locale files
        */
        oGruntConfig.concat = (function (grunt) {
            var oConfig;

            oConfig =  {
                noLang: {
                    src: [
                        '<%= moduleFolder %>/src/<%= modulePath %>/i18n/**/*_en_US.properties'
                    ],
                    dest: '<%= moduleFolder %>/build/<%= modulePath %>/i18n/module.properties'
                },
                enUs: {
                    src: [
                        '<%= moduleFolder %>/src/<%= modulePath %>/i18n/**/*_en_US.properties'
                    ],
                    dest: '<%= moduleFolder %>/build/<%= modulePath %>/i18n/module_en_US.properties'
                }
            };

            return oConfig;
        }(grunt));

        grunt.initConfig(oGruntConfig);

        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-json-minify');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');

        grunt.registerTask('default', [
            'jshint',
            'clean',
            'copy',
            'concat',
            'less',
            'uglify',
            'json-minify',
            'htmlmin'
        ]);
    };
}());
