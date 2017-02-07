'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const exec = require('gulp-exec');
const browserify = require('gulp-browserify');


gulp.task('default', ["sass:watch", "typescript:watch", "browserify:watch"]);

gulp.task('build',  ["sass", "typescript", "browserify"]);


/**
 * Atomar tasks
 * **/
gulp.task('typescript', function () {
    gulp.src("src/**/*.ts").pipe(
        ts()).pipe(gulp.dest('dist/js'));
});

gulp.task('browserify', function () {
    gulp.src("dist/js/index.js").pipe(
        browserify()).pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    gulp.src('src/css/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('dist/src/css'))
});


/**
 * Watch tasks
 * **/

gulp.task('sass:watch', function () {
    gulp.watch('src/css/*.sass', ['sass']);
});


gulp.task('typescript:watch', function () {
    gulp.watch("src/**/*.ts", ["typescript"]);
});

gulp.task('browserify:watch', function () {
    gulp.watch("dist/js/index.js", ["broserify"]);
});