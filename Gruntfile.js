/*globals module*/
(function () {
    'use strict';

    module.exports = function (grunt) {

        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            //JS code quality check with JSHint
            jshint: {
                all: ['src/**/*.js']
            },

            //Copy all files to build folder, selected JS files will be prefixed with -dbg for sap-ui-debug=true
            copy: {
                all: {
                    files: [
                        {
                            expand: true,
                            cwd: 'src',
                            src: [
                                '**/*'
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
                                aSrc[aSrc.length - 2] = aSrc[aSrc.length - 2] + '-dbg';
                                dest = dest + aSrc.join('.');
                                return dest;
                            }
                        }
                    ]
                }
            },

            //Create preload for control library and components
            openui5_preload: {
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
                                'nrg/view/App*.xml',
                                'nrg/view/*Empty.view.xml',
                                'nrg/controller/App*.js'
                            ]
                        },
                        'nrg/component/retention': {
                            src: [
                                'nrg/view/App*.xml',
                                'nrg/view/*Empty.view.xml',
                                'nrg/controller/App*.js'
                            ]
                        }
                    }
                }
            },

            //Compress javascript files
            uglify: {
                target: {
                    files: [
                        {
                            expand: true,
                            cwd: 'src',
                            src: '**/*.js',
                            dest: 'build'
                        }
                    ]
                }
            },

            //Compile LESS files
            less: {
                all: {
                    options: {
                        compress: true
                    },
                    files: {
                        'build/nrg/asset/css/nrg.css': 'src/nrg/asset/css/nrg.source.less',
                        'build/ute/ui/commons/themes/base/library.css': 'src/ute/ui/commons/themes/base/library.source.less',
                        'build/ute/ui/commons/themes/sap_bluecrystal/library.css': 'src/ute/ui/commons/themes/sap_bluecrystal/library.source.less'
                    }
                }
            }

        });

        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-openui5');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.registerTask('default', ['jshint', 'copy', 'openui5_preload', 'uglify', 'less']);
        grunt.registerTask('no_qc', ['copy', 'openui5_preload', 'uglify', 'less']);
    };
}());
