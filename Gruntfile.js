module.exports = function(grunt) {
  grunt.initConfig({
     jshint: {
    options: {
      curly: true,
      eqeqeq: true,
      eqnull: true,
      browser: true,
      globals: {
        jQuery: true
      },
    },
      files: {
        src: ['Gruntfile.js','server/**/*.js', 'tests.server/**/*.js']
      },
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['tests.server/**/*.js']
      }
    },
    nodemon: {
      all: {
        script: 'server.js',
        options: {
          watchedExtensions: ['js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['jshint', 'mochaTest', 'nodemon']);
};