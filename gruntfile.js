module.exports = function (grunt) {
    grunt.initConfig({

    // define source files and their destinations
    uglify: {
        files: { 
            src: 'application/**/*.js',  // source files mask
            dest: 'jsm/',    // destination folder
            expand: true,    // allow dynamic building
            flatten: false,   // remove all unnecessary nesting
            ext: '.min.js'   // replace .js to .min.js
        },
        options: {
            stats: true,
            'screw-ie8': true
        }
    },
    concat: {
        files:{
            src: [
                    'jsm/application/org/core/sunrise.min.js',
                    'jsm/application/org/core/io.min.js',
                    'jsm/application/org/core/controls.min.js',
                    'jsm/application/org/core/canvas.min.js',
                    'jsm/application/org/core/ressourceLoader.min.js',
                    'jsm/application/org/core/util.min.js',
                    'jsm/application/org/core/CoreObject.min.js',
                    'jsm/application/org/core/Sprite.min.js',
                    'jsm/application/org/core/Entity.min.js',
                    'jsm/application/org/core/Stage.min.js',
                    'jsm/application/org/core/init.min.js'

            ],
            dest :'sunrise.min.js'
        }
    },
    clean: {
        js: ['jsm/**', 'jsm']
    },
    watch: {
        js:  { files: 'application/**/*.js', tasks: [ 'uglify', 'concat', 'clean' ] },
    },
    
});

// load plugins
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-uglify');

// register at least this one task
grunt.registerTask('default',['uglify', 'concat', 'clean']);


};