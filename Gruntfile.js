module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    var _ = require('lodash');

    var karmaConfig = function(configFile, customOptions) {
        var options = { configFile: configFile, keepalive: true };
        var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: 'dots' };
        return _.extend(options, customOptions, travisOptions);
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('bower.json'),
        bump: {
            options: {
                pushTo: 'origin',
                files: ['bower.json', 'package.json'],
                commitFiles: ['-a']
            }
        },
        delta: {
            scripts: {
                files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
                tasks: ['jshint', 'karma:unit:run']
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                eqeqeq: true,
                globals: {
                    angular: true
                }
            }
        },
        concat: {
            options: {
                banner: ';(function () {',
                footer: '}())'
            },
            src: {
                src: ['src/**/*.js'],
                dest: 'angular-validad-blitzer.js'
            }
        },
        uglify: {
            src: {
                files: {
                    'angular-validad-blitzer.min.js': '<%= concat.src.dest %>'
                }
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            unit: {
                background: true
            }
        },
        changelog: {
            options: {
                dest: 'CHANGELOG.md'
            }
        },
        ngmin: {
            src: {
                src: '<%= concat.src.dest %>',
                dest: '<%= concat.src.dest %>'
            }
        },
        clean: ['dist/*']
    });

    grunt.renameTask('watch', 'delta');
    grunt.registerTask('watch', ['build', 'karma:unit', 'delta']);
    grunt.registerTask('default', ['jshint', 'karma:unit']);
    grunt.registerTask('test', ['karma:unit']);
    grunt.registerTask('test-server', ['karma:server']);
    grunt.registerTask('build', ['clean', 'jshint']);
    grunt.registerTask('dist', ['build', 'karma:unit', 'concat', 'ngmin', 'uglify']);

};
