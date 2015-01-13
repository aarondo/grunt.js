module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      js: {
        src: ['js/**/*.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      },
      css: {
        src: ['css/**/*.css'],
        dest: 'dist/css/<%= pkg.name %>.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      js: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    cssmin: {
  target: {
    files: [{
      expand: true,
      cwd: 'dist/css',
      src: ['*.css', '!*.min.css'],
      dest: 'dist/css',
      ext: '.min.css'
    },{
      expand: true,
      cwd: '',
      src: ['*.css', '!*.min.css'],
      dest: '',
      ext: '.min.css'
    }]
  }
},
imagemin: {
    dynamic: {
      files: [{
        expand: true,
        cwd: 'images/raw',
        src: ['**/*.{png,jpg,gif}'],
        dest: 'images/'
      }]
    }
  },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');


  grunt.registerTask('default', ['concat', 'uglify','cssmin','imagemin']);

};
