'use strict';

const gulp = require('gulp');

/**
 * Gulp plugins
 * */
const browserify2 = require('browserify');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');
const browserify = require('gulp-browserify');
const tsProject = ts.createProject('tsconfig.json');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

/**
 * Development Testbrowser
 * */

gulp.task('default', ['sass:watch', 'typescript:watch', 'browserify:watch', 'browserify', 'run']);
gulp.task('build', ['sass', 'typescript', 'browserify']);


/**
 * Atomar tasks
 * **/

gulp.task('run', function () {
    browserSync.init({
        server: "."
    });
});


gulp.task('typescript', function () {
    gulp.src('src/**/*.ts')
        .pipe(tsProject()).js
        .pipe(gulp.dest('dist/js'));
    browserSync.reload();
});

gulp.task('browserify', function () {

    const browsy = browserify2({
        entries: 'dist/js/index.js',
        debug: true
    });

    browsy.bundle()
        .pipe(source('dist/js/index.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadSourceMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(rename("bundle.js"))
        .pipe(gulp.dest('dist/js'));

    browserSync.reload();

});

gulp.task('sass', function () {
    gulp.src('src/css/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('dist/src/css')).pipe(
        browserSync.stream());
});


/**
 * Watch tasks
 * **/

gulp.task('sass:watch', function () {
    gulp.watch('src/css/*.sass', ['sass']);
});


gulp.task('typescript:watch', function () {
    gulp.watch('src/**/*.ts', ['typescript']);
});

gulp.task('browserify:watch', function () {
    gulp.watch('dist/js/index.js', ['browserify']);
});