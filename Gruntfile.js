module.exports = function(grunt) {

  var WEBSERVER_PORT = 8103;
  var LIVERELOAD_PORT = 8675;

  grunt.initConfig({
    docco: {
      debug: {
        src: ['mjs.js'],
        options: {
          output: 'docs/'
        }
      }
    },

    connect: {
      docs: {
        options: {
          port: WEBSERVER_PORT,
          livereload: LIVERELOAD_PORT,
          open: 'http://localhost:' + WEBSERVER_PORT + '/docs/mjs.html'
        }
      }
    },

    watch: {
      options: {
        interval: 500,
        forever: true,
        debounceDelay: 1000,
        livereload: LIVERELOAD_PORT
      },

      src: {
        files: ['mjs.js'],
        tasks: ['docs']
      }
    }
  });

  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('docs', ['docco']);
  grunt.registerTask('default', ['docs', 'connect', 'watch']);
};
