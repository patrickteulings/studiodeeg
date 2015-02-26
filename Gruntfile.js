// commands:
// grunt >> watch

module.exports = function (grunt) {

	// Configurable paths
	var config = {
		app: '',
		dist: 'dist'
	};

	grunt.initConfig({

		// Project settings
		config: config,

		express: {
			all: {
				options: {
					port: 1234,
					hostname: 'localhost',
					livereload: false, // Deze heb ik hier uit gezet, want anders gaat het een oneindige loop creeren volgens mij met Watch.
					bases:['.']
					// spawn: false,
					// debounceDelay: 5000 // in milliseconds
				}
			}
		},
		pkg: grunt.file.readJSON('package.json'),

		less: {
			build: {
				options: {
					paths: ["<%= config.dist %>/css"]
				},
				files: {
					'<%= config.dist %>/css/app.css': ['src/less/app.less']
				}
			},
            build_admin: {
                options: {
                    paths: ["<%= config.dist %>/admin/css"]
                },
                files: {
                    '<%= config.dist %>/admin/css/app.css': ['src/admin/less/app.less']
                }
            }
		},

		concat: {
			options: {
				separator: '\n',
				stripBanners: {
					block: false,
					line: false
				},
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> */ '
			},
			js: {
				src: [
					'src/js/vendor/jquery/jquery-1.11.1.min.js',
					'src/js/vendor/asual/jquery.address-1.5.js',
					'src/js/vendor/bootstrap/bootstrap.min.js',
					'src/js/vendor/greensock-js/CSSPlugin.min.js',
					'src/js/vendor/greensock-js/EasePack.min.js',
					'src/js/vendor/greensock-js/TweenLite.min.js',
		            'src/js/vendor/modernizr/modernizr.js',		            
					'src/js/vendor/fastclick/fastclick.js',
					'src/js/vendor/spin/spin.js',
					'src/js/helpers/localstorage.js',
					'src/js/helpers/utilities.js',
					'src/js/helpers/partialsloader.js',
					'src/js/templates/templates.js',
					'src/js/modules/socials.js',
					'src/js/modules/factory.js',
					'src/js/modules/router.js',
					'src/js/modules/mainnavigation.js',
					'src/js/modules/home.js',
					'src/js/app.js'					

				],
				dest: '<%= config.dist %>/js/app.js'
			},
			css: {
				src: [
					'src/less/bootstrap.min.css',
					'<%= config.dist %>/css/app.css'
				],
				dest: '<%= config.dist %>/css/app.css'
			}
		},

		uglify: {
			prod: {
				src: ['<%= config.dist %>/js/app.js'],
				dest: '<%= config.dist %>/js/app.min.js'
			},
            admin: {
                src: ['<%= config.dist %>/admin/js/app.js'],
                dest: '<%= config.dist %>/admin/js/app.min.js'
            }
		},

		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				ignores: ['src/js/vendor/**/*.js' , 'src/js/bootstrap.min.js','src/js/plugins/*.js']
			},
			all: {
				src: ['src/js/**/*.js']
			}
		},

		copy: {
		  main: {
		    files: [
            ]
		  }
		},


		/******************************************************************
		 *
		 *    Watch looks for changes in the file, and runs a specific task when there is a change.
		 *
		 ******************************************************************/


		watch: {
			// options: {
			//     livereload: true,
			// },
			grunt: {
				files: ['Gruntfile.js']
			},
			css: {
				files: ['src/less/**/*.less'],
				tasks: ['less', 'less:build', 'concat:css']
			},
			scripts: {
				files: ['src/js/**/*.js'],
				tasks: ['jshint', 'concat:js','copy:main']
			}
		}
	});

	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ftp-push');
	grunt.loadNpmTasks('grunt-express');

	grunt.registerTask('build', ['less', 'concat']);
	grunt.registerTask('default', ['build','express','watch']); // Called by default when starting grunt
	grunt.registerTask('prod', ['build','copy:prod']); // Called by default when starting grunt
	grunt.registerTask('admin', ['less:build_admin', 'concat:css_admin', 'concat:js_admin', 'copy:admin','watch']); // Called for building admin

};
