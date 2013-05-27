module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
            options: {
                flatten: true,
                layout: 'src/templates/layout.html',
                partials: 'src/templates/partials/*.html',
                data: 'src/data/*.json'
            },
            pages: {
                files: {
                    'build/': ['src/templates/cheatsheet.html']
                },
                data: ['src/data/*.json', {'year': grunt.template.today("yyyy")}]
            }
        },
        concat: {
            js: {
                src: ['cheatsheet/js/vendor/*.js'],
                dest: 'build/scripts.js'
            },
            css: {
                src: ['cheatsheet/css/*.css'],
                dest: 'build/styles.css'
            }
        },
        cssmin: {
            main: {
                files: {
                    'build/styles.min.css': '<%= concat.css.dest %>'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.description %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            main: {
                files: {
                    'build/scripts.min.js': '<%= concat.js.dest %>'
                }
            }
        }
    });

    grunt.loadNpmTasks('assemble');
    grunt.registerTask('default', ['assemble']);
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
};