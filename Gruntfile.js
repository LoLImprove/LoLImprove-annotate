module.exports = function (grunt) {
  'use strict';

  var path = require('path');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-neuter');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      main: {
        expand: true,
        cwd: 'src',
        src: '**',
        dest: 'build/src/'
      }
    },

    emberTemplates: {
      options: {
        templateName: function(sourceFile) {
          return sourceFile.replace(/src\/templates\//, '');
        }
      },
      'build/src/templates.js': ["src/templates/**/*.hbs"]
    },

    neuter: {
      options: {
        includeSourceURL: false,
        separator: "\n"
      },
      "dist/ember-yannotate.js":  ["build/src/main.js", "build/src/templates.js"]
    },

    clean: {
      build: ["./build"],
      dist: ["./dist"],
      app: ["./yannotate-app/tmp/dist"]
    },

    jsdoc: {
      all: {
        src: [
          "./build/src/*.js",
          "./build/src/**/*.js"
        ],
        dest: "doc/"
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          next: true,
          require: true
        }
      },
      all: ["Gruntfile.js", "build/src/**/*.js"]
    },

    qunit: {
      all: ['tests/*.html']
    },

    uglify: {
      file: {
        options: {
          preserveComments: false,
          beautify: false,
          mangle: true,
          report: 'min'
        },

        files: {
          './dist/ember-yannotate.min.js': [
            // Include dist in bundle
            './dist/ember-yannotate.js'
          ]
        }
      }
    },

    watch: {
      grunt: {
        files: ["Gruntfile.js"],
        tasks: ["default"],
        options: {
          spawn: false
        }
      },
      code: {
        files: ["src/**/*.js", "dependencies/**/*.js", "vendor/**/*.js"],
        tasks: ["clean:app", ,"clean:build", "neuter"]
      },
      handlebars: {
        files: ["src/**/*.hbs"],
        tasks: ["clean:app", , "clean:build", "emberTemplates", "neuter"]
      },
      sass: {
        files: ["src/**/*.scss"],
        tasks: ["clean:app", "clean:build", "sass"]
      },
      all: {
        files: [
                "src/**/*.js", "src/**/*.hbs",
                "yannotate-app/app/**/*.js", "yannotate-app/app/**/*.hbs",
                "yannotate-app/app/**/*.css", "yannotate-app/app/**/*.scss"
               ],
        tasks: ["build"],
        options: {
          spawn: false
        }
      }
    }
  });

  // Build tasks
grunt.registerTask("build", ["clean:app", "clean:build", "copy", "emberTemplates", "neuter"]);

  grunt.registerTask("build_watch", ["build", "watch:all"])

  grunt.registerTask("dist", ["clean:dist", "build", "uglify"]);

  grunt.registerTask("default", ["dist", "watch:all", "watch:grunt"]);
};
