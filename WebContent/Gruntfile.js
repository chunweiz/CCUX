/*globals module, require*/

(function () {
    'use strict';

    module.exports = function (grunt) {
        var config = {};

        //Task configuration for jshint
        config.jshint = (function initJshint(grunt) {
            //JS code quality check with JSHint

            return {
                all: {
                    files: {
                        cwd: 'src',
                        src: [
                            'nrg/component/**/*.js',
                            'nrg/controller/**/*.js',
                            'nrg/util/**/*.js',
                            'nrg/view/**/*.js',
                            'ute/**/*.js',
                            'Gruntfile.js'
                        ]
                    }
                }
            };
        }(grunt));

        //Task configuration for clean
        config.clean = (function initClean(grunt) {
            //Cleanup build folder

            return {
                build: [
                    'build/**'
                ]
            };
        }(grunt));

        //Task configuration for copy
        config.copy = (function initCopy(grunt) {
            //Copy everything to build folder
            //Selected UI5 specific JS files will be recopied with suffix -dbg for sap-ui-debug purpose

            return {
                all: {
                    files: [
                        {
                            expand: true,
                            cwd: 'src',
                            src: [
                                'nrg/asset/css/core/font/**',
                                'nrg/asset/img/**',
                                '!nrg/asset/img/**/*.svg',
                                'nrg/component/**',
                                'nrg/controller/**',
                                'nrg/data/**',
                                'nrg/util/**',
                                'nrg/view/**',
                                'ute/ui/commons/**/*.js'
                            ],
                            dest: 'build/',
                            filter: 'isFile'
                        },
                        {
                            expand: true,
                            cwd: 'src',
                            src: [
                                'nrg/component/**/*.js',
                                'nrg/controller/**/*.js',
                                'nrg/util/**/*.js',
                                'nrg/view/**/*.js',
                                'ute/ui/commons/**/*.js'
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
        }(grunt));

        //Task configuration for concat
        config.concat = (function initConcat(grunt) {
            //Merge all .properties files into a single .properties file

            return {
                noLang: {
                    src: [
                        'src/nrg/i18n/view/**/*_en_US.properties'
                    ],
                    dest: 'build/nrg/i18n/messageBundle.properties'
                },
                enUs: {
                    src: [
                        'src/nrg/i18n/view/**/*_en_US.properties'
                    ],
                    dest: 'build/nrg/i18n/messageBundle_en_US.properties'
                }
            };
        }(grunt));

        //Task configuration for less
        config.less = (function initLess(grunt) {
            //Compile LESS files to compressed CSS files with IE9 and above compatibility

            var LessPluginAutoPrefix, LessPluginCleanCss, oLessAutoPrefix, oLessCleanCss;

            LessPluginAutoPrefix = require('less-plugin-autoprefix');
            LessPluginCleanCss = require('less-plugin-clean-css');

            oLessAutoPrefix = new LessPluginAutoPrefix({
                browsers: [
                    'ie >= 8'
                ]
            });

            oLessCleanCss = new LessPluginCleanCss({
                advanced: true
            });

            return {
                all: {
                    options: {
                        plugins: [
                            oLessAutoPrefix,
                            oLessCleanCss
                        ]
                    },
                    files: {
                        'build/ute/ui/commons/themes/base/library.css': 'src/ute/ui/commons/themes/base/library.source.less',
                        'build/ute/ui/commons/themes/sap_bluecrystal/library.css': 'src/ute/ui/commons/themes/sap_bluecrystal/library.source.less',
                        'build/nrg/asset/css/nrg.css': 'src/nrg/asset/css/nrg.source.less'
                    }
                }
            };

        }(grunt));

        //Task configuration for uglify
        //Compress related javascript files
        config.uglify = (function initUglify(grunt) {
            return {
                all: {
                    files: [
                        {
                            expand: true,
                            cwd: 'src',
                            src: [
                                'nrg/component/**/*.js',
                                'nrg/controller/**/*.js',
                                'nrg/util/**/*.js',
                                'nrg/view/**/*.js',
                                'ute/ui/commons/**/*.js'
                            ],
                            dest: 'build'
                        }
                    ]
                }
            };
        }(grunt));

        //Task configuration for merge-json
        //Merge related json files
        //Sequence is important for routes!
        //Make sure manifest.json is last in src because catchall route needs to be last
        config.mergeJson = (function initMergeJson(grunt) {
            return {
                'manifest-ic': {
                    src: [
                        'src/nrg/data/**/mock.json',
                        'src/nrg/view/**/routing.json',
                        'src/nrg/component/ic/manifest.json'
                    ],
                    dest: 'build/nrg/component/ic/manifest.json'
                },
                'manifest-retention': {
                    src: [
                        'src/nrg/data/**/mock.json',
                        'src/nrg/view/**/routing.json',
                        'src/nrg/component/retention/manifest.json'
                    ],
                    dest: 'build/nrg/component/retention/manifest.json'
                }
            };
        }(grunt));

        //Task configuration for json-minify
        //Compress related json files - right now, it is only for manifest
        config.jsonMinify = (function initJsonMinify(grunt) {
            return {
                build: {
                    files: 'build/nrg/component/**/manifest.json'
                }
            };
        }(grunt));

        //Task configuration for htmlmin
        //Compress related HTML and XML files
        config.htmlMin = (function initHtmlMin(grunt) {
            return {
                html: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: [
                        {
                            expand: true,
                            cwd: 'src',
                            src: [
                                'nrg/component/**/*.html',
                                'nrg/controller/**/*.html',
                                'nrg/util/**/*.html',
                                'nrg/view/**/*.html',
                                'ute/ui/commons/**/*.html'
                            ],
                            dest: 'build'
                        }
                    ]
                },
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
                            cwd: 'src',
                            src: [
                                'nrg/component/**/*.xml',
                                'nrg/controller/**/*.xml',
                                'nrg/util/**/*.xml',
                                'nrg/view/**/*.xml',
                                'ute/ui/commons/**/*.xml'
                            ],
                            dest: 'build'
                        }
                    ]
                }
            };
        }(grunt));

        //Task configuration for openui5_preload
        //Create preload for control library and components
        config.openui5Preload = (function initOpenui5Preload(grunt) {
            return {
                lib: {
                    options: {
                        resources: 'src',
                        dest: 'build'
                    },
                    libraries: true
                },

                comp: {
                    options: {
                        resources: 'src',
                        dest: 'build'
                    },
                    components: {
                        'nrg/component/ic': {
                            src: [
                                'nrg/view/app/App*.xml',
                                'nrg/view/others/*Empty.view.xml',
                                'nrg/view/app/App*.js',
                                'nrg/view/others/*Empty.controller.js'
                            ]
                        },
                        'nrg/component/retention': {
                            src: [
                                'nrg/view/app/App*.xml',
                                'nrg/view/others/*Empty.view.xml',
                                'nrg/view/app/App*.js',
                                'nrg/view/others/*Empty.controller.js'
                            ]
                        }
                    }
                }
            };
        }(grunt));

        //Task configuration for csslint
        config.csslint = (function initCsslint(grunt) {
            return {
//                strict: {
//                    src: [
//                        'build/nrg/asset/css/nrg.css',
//                        'build/ute/ui/commons/themes/base/library.css',
//                        'build/ute/ui/commons/themes/sap_bluecrystal/library.css'
//                    ]
//                }
            };
        }(grunt));

        //Task configuration for svgmin
        //Compress svg files
        config.svgmin = (function initSvgmin(grunt) {
            return {
//                dist: {
//                    files: [
//                        {
//                            expand: true,
//                            cwd: 'src',
//                            src: 'nrg/asset/img/**/*svg',
//                            dest: 'build'
//                        }
//                    ]
//                }
            };
        }(grunt));

        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            jshint: config.jshint,
            clean: config.clean,
            copy: config.copy,
            concat: config.concat,
            less: config.less,
            csslint: config.csslint,
            uglify: config.uglify,
            'merge-json': config.mergeJson,
            'json-minify': config.jsonMinify,
            htmlmin: config.htmlMin,
            svgmin: config.svgmin,
            openui5_preload: config.openui5Preload
        });

        grunt.loadNpmTasks('grunt-openui5');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');
//        grunt.loadNpmTasks('grunt-svgmin');
//        grunt.loadNpmTasks('grunt-contrib-csslint');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-json-minify');
        grunt.loadNpmTasks('grunt-merge-json');

        grunt.registerTask('default', ['jshint', 'clean', 'copy', 'concat', 'openui5_preload', 'uglify', 'merge-json', 'json-minify', 'htmlmin', 'less']);
    };
}());
