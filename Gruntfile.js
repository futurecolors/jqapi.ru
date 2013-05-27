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
                src: ['src/js/**/*.js'],
                dest: 'build/scripts.js'
            },
            css: {
                src: ['src/css/reset.css', 'src/css/common.css', 'src/css/wrapper.css',
                      'src/css/header.css', 'src/css/footer.css', 'src/css/jquery.css'],
                dest: 'build/styles.css'
            }
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.description %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                report: 'gzip'
            },
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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['assemble', 'concat', 'cssmin']);
};