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
                files: [
                    {src: 'src/templates/cheatsheet.html', dest: 'build/index.html'}
                ],
                data: ['src/data/*.json', {'year': grunt.template.today("yyyy")}]
            }
        },
        copy: {
            main: {
                files: [{expand: true, cwd: 'src/images/', src: ['**'], dest: 'build/'},
                        {src: 'CNAME', dest: 'build/CNAME'}
                ]
            }
        },
        concat: {
            js: {
                src: ['src/js/**/*.js'],
                dest: 'build/scripts.js'
            },
            css: {
                src: ['src/css/reset.css', 'src/css/common.css', 'src/css/wrapper.css',
                      'src/css/header.css', 'src/css/footer.css', 'src/css/jquery.css',
                      'src/css/social-likes.css'
                ],
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
        },
        connect: {
            test: {
                options: {
                    port: 8000,
                    base: 'build',
                    keepalive: true
                }
            }
        },
        'gh-pages': {
            options: {
                base: 'build',
                message: "Let's start cooking!"
            },
            src: ['*']
        }
    });

    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.registerTask('default', ['assemble', 'copy', 'concat', 'cssmin', 'uglify']);
    grunt.registerTask('serve', ['default', 'connect']);
    grunt.registerTask('publish', ['default', 'gh-pages']);
};