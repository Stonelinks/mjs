module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    docco: {
      debug: {
        src: ['mjs.js'],
        options: {
          output: 'docs/'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-docco');

  grunt.registerTask('default', ['docco']);
};
