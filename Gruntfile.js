var fs = require('fs'),
    pkg = require('./package'),
    path = require('path');

function rename_release(v) {
    return function (d, f) {
        var dest = path.join(d, f.replace(/(\.min)?\.js$/, '-' + v + '$1.js').replace('MEANBootstrap-', ''));
        return dest;
    };
}

module.exports = function (grunt) {
    grunt.initConfig({
        bower_concat: {
            all: {
                dest: 'public/js/vendor/vendor.js',
                cssDest: 'src/public/less/whitelabel/base/vendor.less',
                dependencies: {
                    'angular-sanitize': 'angular',
                    'angular-route': 'angular'
                }
            }
        },
        env: {
            dev: {
                src: 'env-dev.json'
            }
        },
        express: {
            options: {},
            dev: {
                options: {
                    script: 'src/server.js',
                    nospawn: true,
                    delay: 5
                }
            }
        },
        jade: {
            compile: {
                files: [{
                    expand: true,
                    cwd: 'src/app',
                    src: ['**/*.tpl.jade'],
                    dest: '.jade/',
                    ext: '.tpl.html'
                }]
            }
        },
        html2js: {
            options: {
                module: 'mean-tpl',
                base: '.jade',
                rename: function (moduleName) {
                    return moduleName.replace('.html', '');
                }
            },
            main: {
                dest: '.jade/templates.js',
                src: ['.jade/**/*.tpl.html']
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                additionalSuffixes: ['.js']
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            test: {
                src: [
                    'src/**/*.js'
                ]
            }
        },
        browserify: {
            release: {
                files: {
                    'build/application.js': ['src/public/js/standalone.js']
                },
                options: {
                    transform: ['brfs', 'packageify', 'browserify-shim']
                }
            },
            debug: {
                files: {
                    'build/application.js': ['src/public/js/standalone.js']
                },
                options: {
                    bundleOptions: {
                        debug: true
                    },
                    watch: true,
                    transform: ['brfs', 'packageify', 'browserify-shim']
                }
            }
        },
        less: {
            dist: {
                files: {
                    'public/css/whitelabel.css': 'src/public/less/whitelabel/main.less',
                    'public/css/blank-theme.css': 'src/public/less/themes/blank-theme/main.less'
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({browsers: 'last 1 version'}),
                    require('csswring')
                ]
            },
            dist: {
                files: {
                    'public/css/whitelabel.min.css': 'public/css/whitelabel.css',
                    'public/css/blank-theme.min.css': 'public/css/blank-theme.css'
                }
            }
        },
        copy: {
            dev: {
                files: {
                    'public/js/application.min.js': 'build/application.min.js',
                    'public/js/application.js': 'build/application.js'

                }
            },
            release: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: 'build/vendor.min.js',
                        dest: 'release/',
                        rename: rename_release(pkg.version)
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: 'build/application.min.js',
                        dest: 'release/',
                        rename: rename_release(pkg.version)
                    }
                ]
            }
        },
        uglify: {
          js: {
            options: {
              beautify: false,
              ASCIIOnly: true,
            },
            files: {
              'build/application.min.js': ['build/application.js'],
              'build/vendor.min.js': ['public/js/vendor/vendor.js']
            }
          }
        },
        clean: {
            js: ['release/', 'build/', 'public/js/application.js', 'public/js/application.min.js']
        },
        watch: {
            js: {
                files: ['build/application.js'],
                tasks: ['copy:dev'],
                options: {
                    livereload: true
                }
            },
            jade: {
                files: ['src/app/**/*.tpl.jade'],
                tasks: ['build-tpl']
            },
            less: {
                files: [
                    'src/public/**/*.less'
                ],
                tasks: ['build-css'],
                options: {
                    livereload: true
                }
            },
            express: {
                files: ['src/server.js', 'src/templates/**/*.jade', 'src/utils/**/*.js'],
                tasks: ['express:dev'],
                options: {
                    nospawn: true
                }
            }
        },
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: 'release/',
                src: ['**/*'],
                dest: 'release-gzip/'
            }
        }
    });

    for (var key in grunt.file.readJSON('package.json').devDependencies) {
        if (key !== 'grunt' && key !== 'grunt-cli' && key.indexOf('grunt') === 0) {
            grunt.loadNpmTasks(key);
        }
    }

    grunt.registerTask('css', ['less:dist', 'postcss']);
    grunt.registerTask('js', ['bower_concat', 'jshint', 'browserify:debug', 'uglify:js']);
    grunt.registerTask('js-release', ['bower_concat', 'jshint', 'browserify:release', 'uglify:js']);

    grunt.registerTask('build', ['jade', 'html2js', 'js', 'css', 'copy:dev']);
    grunt.registerTask('build-css', ['css', 'copy:dev']);
    grunt.registerTask('build-tpl', ['jade', 'html2js', 'copy:dev']);
    grunt.registerTask('build-release', ['js-release', 'css', 'copy:dev']);
    grunt.registerTask('rel', ['js-release', 'css', 'copy:dev']);
    grunt.registerTask('ci', ['clean:js', 'jshint']);

    grunt.registerTask('dev', ['env', 'express:dev', 'build', 'watch']);
    grunt.registerTask('release', ['clean:js', 'env', 'i18n', 'copy:release', 'compress', 'azure-blob']);

    grunt.registerTask('dev-notest', ['env', 'express:dev', 'build-notest', 'watch']);
    grunt.registerTask('build-notest', ['js-notest', 'css', 'copy:dev']);
    grunt.registerTask('js-notest', ['bower_concat', 'jshint', 'browserify:debug', 'uglify:js']);
};
