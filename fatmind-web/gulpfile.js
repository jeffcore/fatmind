var gulp = require('gulp'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    less = require('gulp-less');

//generic error log
function errorLog(error){
  	console.error.bind(error);
  	this.emit('end');
};

//Set up Connect Webserver with live reload
gulp.task('connect', function(){
    connect.server({
        port: 8090,
        livereload: false,
        hostname: 'localhost'
    });
});

// Styles SASS
gulp.task('styles', function(){
    return sass('./src/scss/**/*.scss', {style: 'compressed', "sourcemap=none": true})
        .on('error', errorLog)
        .pipe(gulp.dest('./build/css/'));
});

//Styles LESS
gulp.task('less', function () {
  return gulp.src('./src/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./build/css'));
});

//Javascript Minify
gulp.task('minjs', function() {
    gulp.src('src/js/**/*.js')
        .on('error', errorLog)
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});

//Reload files when changed
gulp.task('reload', function(){
    gulp.src(['./src/js/*', './build/**/*.*', './templates/**', './index.html'])
    .pipe(connect.reload());
});

//Watch JS file changes
gulp.task('watchjs', function(){
    gulp.watch('src/js/*.js', ['minjs','reload']);
});

gulp.task('watchscss', function(){
    gulp.watch('src/scss/**/*.scss', ['styles','reload']);
});

//Watch for HTML file changes
gulp.task('watch', function(){
    gulp.watch(['./templates/**', './index.html'], ['reload']);
});

//default tasks
gulp.task('default', ['minjs', 'styles', 'less', 'connect', 'watch', 'watchjs','watchscss']);
