'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var jstify = require('jstify');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('./scripts/*/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./client/css'));
});


gulp.task('scripts', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: './scripts/app.js',
        debug: true
    }).transform('jstify', { engine: 'lodash' });

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            .pipe(uglify())
            .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./client/scripts'));
    });

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./scripts/*/*.js', ['lint', 'scripts']);
    gulp.watch('./scripts/*/*.tpl', ['lint', 'scripts']);
    gulp.watch('./scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
