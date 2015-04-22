var gulp        = require('gulp');
var webserver   = require('gulp-webserver');
var connect     = require('gulp-connect');
var php         = require('gulp-connect-php');
var less        = require('gulp-less');
var concat      = require('gulp-concat');
var jshint      = require('gulp-jshint');
var notify      = require("gulp-notify");
var uglify      = require('gulp-uglify');
var rename      = require("gulp-rename");
var minifyCSS   = require("gulp-minify-css");

var paths = {
    less:'./src/less/**/*.less',
    scripts: './src/js/**/*.js'
}


//  *************************************************************** //
//                                                                  
//  START A PHP SERVER
//                                                                  
//  **************************************************************  //


gulp.task('php', function() {
    php.server({
        port:'8080',
        base: 'dist'
    });
});


//  *************************************************************** //
//                                                                  
// CONCAT JS FILES
//                                                                  
//  **************************************************************  //

 
gulp.task('concat', function() {
    return gulp.src([
        'src/js/vendor/jquery/jquery-1.11.1.min.js',
        'src/js/vendor/history/jquery.history.js',
        'src/js/vendor/asual/jquery.address-1.5.js',
        'src/js/vendor/bootstrap/bootstrap.min.js',
        'src/js/vendor/greensock-js/CSSPlugin.min.js',
        'src/js/vendor/greensock-js/EasePack.min.js',
        'src/js/vendor/greensock-js/TweenLite.min.js',
        'src/js/vendor/modernizr/modernizr.js',
        'src/js/vendor/fastclick/fastclick.js',
        'src/js/vendor/spin/spin.js',
        'src/js/vendor/create-js/preloadjs-0.6.0.min.js',
        'src/js/helpers/localstorage.js',
        'src/js/helpers/utilities.js',
        'src/js/helpers/partialsloader.js',
        'src/js/templates/templates.js',
        'src/js/helpers/smoothprogressbar.js',
        'src/js/modules/socials.js',
        'src/js/modules/factory.js',                    
        'src/js/modules/mainnavigation.js',
        'src/js/modules/work.js',
        'src/js/modules/home.js',                   
        'src/js/modules/router.js',
        'src/js/app.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/js'));
});


//  *************************************************************** //
//                                                                  
// JS LINTING, BECAUSE WE WANT TO DELIVER CLEAN CODE
//                                                                  
//  **************************************************************  //



gulp.task('lint', function() {
  return gulp.src(['./src/js/app.js','./src/js/helpers/*.js','./src/js/modules/*.js','./src/js/templates/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
        .on('error', notify.onError({ message: 'JS hint fail'}));
});


//  *************************************************************** //
//                                                                  
// UGLIFY JS FILES
//                                                                  
//  **************************************************************  //

 
gulp.task('uglify', function() {
  return gulp.src('./dist/js/app.js')
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./dist/js'));
});


//  *************************************************************** //
//                                                                  
// COMPILE LESS FILES
//                                                                  
//  **************************************************************  //

 
gulp.task('less', function () {
  return gulp.src('./src/less/app.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css'));
});


//  *************************************************************** //
//                                                                  
// MINIFY CSS FOR PRODUCTION
//                                                                  
//  **************************************************************  //


gulp.task('minifyCSS', function() {
    return gulp.src('./dist/css/app.css')
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('./dist/css/'))
});





//  *************************************************************** //
//                                                                  
// WATCH TASK, RERUN EVERY TIME A FILE CHANGES
//                                                                  
//  **************************************************************  //


gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['concat','lint']);
    gulp.watch(paths.less, ['less']);    
});
 

//  *************************************************************** //
//                                                                  
// ADD TASKS TO RUN ON DEFAULT 'GULP' COMMAND
//                                                                  
//  **************************************************************  //


gulp.task('default', ['php','less','concat','lint','watch']);
gulp.task('prod', ['uglify','minifyCSS']);


