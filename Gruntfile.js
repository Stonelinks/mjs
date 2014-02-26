module.exports = function(grunt) {

  var WEBSERVER_PORT = 8103;
  var LIVERELOAD_PORT = 8675;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    preprocess: {
      options: {
        context: {
          MJS_VERSION: '<%= pkg.version %>',
          MJS_HOMEPAGE: '<%= pkg.homepage %>',
          MJS_DO_ASSERT: true
        }
      },
      dev: {
        src: 'src/mjs.js',
        dest: 'mjs.js'
      },
      prod: {
        src: 'src/mjs.js',
        dest: 'mjs.js',
        options: {
          context: {
            MJS_DO_ASSERT: false
          }
        }
      }
    },

   uglify: {
      options: {
        banner: '/* <%= pkg.name %> v<%= pkg.version %>\n * <%= pkg.author %>\n * built on <%= grunt.template.today("yyyy-mm-dd") %> \n */\n'
      },
      prod: {
        mangle: {
          except: ['mjs', 'V3', 'M4x4']
        },
        src: 'mjs.js',
        dest: 'mjs.min.js'
      }
    },

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
        files: ['src/**/*.js'],
        tasks: ['build', 'docs']
      }
    }
  });

  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-preprocess');

  grunt.registerTask('build', ['preprocess:prod', 'uglify', 'preprocess:dev']);
  grunt.registerTask('docs', ['docco']);
  grunt.registerTask('default', ['build', 'docs', 'connect', 'watch']);
};
