
module.exports = function(grunt) {
 
  // configure the tasks
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    
    /*
    COPY

    Copies all of our source files into the build folder
    */
    copy: {
      build: {
        cwd: 'source',
        src: [ '**' ],
        dest: 'build',
        expand: true
      },
    },

    /*
     CLEAN
    
     Handles cleanup of the build folder:
      - build: completely wipes build folder clean
      - scripts: cleans the js folder of any non-compiled js
      - styles: removes the sass folder
      - html: removes the jade folder
    */
    clean: {
      build: {
        src: [ 'build' ]
      },
      postCompilation: {
        src: [ 'build/js/*', '!build/js/app.min.js', 'build/sass/', 'build/jade', 'build/docs' ]
      }
    },

    /*
    BROWSERIFY

    Cocatenates CommonJS modules into one browser-compatible file
    */
    browserify: {
      dist: {
        files: {
          'build/js/app.min.js': ['source/js/**/*.js']
        }
      },
      test: {
        files: {
          'test/app.test.min.js': ['test/app.test.js']
        }
      }
    },

    /*
    UGLIFY

    Minifies javascript files
    */
    uglify: {
      build: {
        options: {
          mangle: false
        },
        files: {
          'build/js/app.min.js': [ 'build/js/app.min.js' ]
        }
      }
    },

    /*
    CSSMIN

    Minifies CSS files
    */
    cssmin: {
      build: {
        files: {
          'build/application.css': [ 'build/**/*.css' ]
        }
      }
    },

    /*
    JADE

    Compiles .jade files in the source folder into proper .html files
    in the build folder
    */
    jade: {
      compile: {
        options: {
          data: {}
        },
        files: [{
          expand: true,
          cwd: 'source/jade/templates',
          src: [ '**/*.jade' ],
          dest: 'build',
          ext: '.html'
        }]
      }
    },

    /*
    JSHINT

    Lints our .js files, with options for before and after build
    */
    jshint: {
      beforeBuild: ['source/js/**/*.js'],
      afterBuild: ['build/js/**/*.js']
    },

    sass: {
      dist: {
        files: {
          'build/style/main.css' : 'source/sass/main.sass'
        }
      }
    },

    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: 'source/js/',
          outdir: 'docs/'
        }
      }
    },

    mocha: {
      test: {
        src: ['test/index.html'],
        options: {
          run: true
        }
      },
    },

    connect: {
      server: {
        options: {
        port: 4000,
        }
      }
    },

    watch: {
      
      modifications: {
        files: 'source/**/*.*',
        tasks: [ 'build' ],
        options: {
          livereload: true,
        }

      },
      tests: {
        files: 'test/**/*.*',
        tasks: [ 'browserify:test', 'mocha' ],
        options: {
          livereload: true,
        }
      }
    }

 
  });
 
  // load the tasks
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-mocha');
 
  // define the tasks
  grunt.registerTask(
    'build', 
    'Compiles all of the assets and copies the files to the build directory.', 
    [ 'clean', 'copy', 'jshint:beforeBuild', 'browserify', 'uglify', 'jade', 'sass', 'yuidoc', 'clean:postCompilation' ]
  );

  grunt.registerTask(
    'default', 
    'Watches the project for changes, automatically builds them and runs a server.', 
    [ 'build', 'connect', 'mocha', 'watch' ]
  );

};