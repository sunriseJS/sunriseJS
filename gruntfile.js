module.exports = function (grunt) {
    grunt.initConfig({

    // define source files and their destinations
    uglify: {
        options: {
          sourceMap: 'sunrise.min.js.map'
        },
        files: { 
            src: 'debug/sunrise.js',  // source files mask
            dest: '',    // destination folder
            expand: true,    // allow dynamic building
            flatten: true,   // remove all unnecessary nesting
            ext: '.min.js'   // replace .js to .min.js
        }
    },
    concat: {
        files:{
            src: [
                    'application/org/core/sunrise.js',
                    'application/org/core/pluginManager.js',
                    'application/org/core/finitStateMachine.js',
                    'application/org/core/io.js',
                    'application/org/core/controls.js',
                    'application/org/core/canvas.js',
                    'application/org/core/ressourceLoader.js',
                    'application/org/core/util.js',
                    'application/org/core/CoreObject.js',
                    'application/org/core/Sprite.js',
                    'application/org/core/Entity.js',
                    'application/org/core/Stage.js',
                    'application/org/core/components/Component.js',
                    'application/org/core/components/Render.js',
                    'application/org/core/init.js'

            ],
            dest :'debug/sunrise.js'
        }
    },
    clean: {
        js: ['sunrise.js']
    },
    watch: {
        js:  { files: 'application/**/*.js', tasks: ['concat', 'uglify'] },
    },
    
});

// load plugins
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-uglify');

// register at least this one task
grunt.registerTask('default', ['concat', 'uglify']);


};