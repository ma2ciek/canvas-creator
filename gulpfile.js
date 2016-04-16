'use strict';

const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const livereload = require('gulp-livereload');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('default', ['ts', 'lib']);

gulp.task('ts', ['clean'], () =>
    gulp.src('./src/**/*.ts')
        .pipe(ts(tsProject))
        .pipe(gulp.dest('build'))
        .pipe(livereload({ port: 8001 }))
);

gulp.task('lib', ['clean'], () =>
    gulp.src('./node_modules/requirejs/require.js')
        .pipe(gulp.dest('build/lib')));

gulp.task('clean', () => del('./build/**/**'));

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('./src/**/*.ts', ['default']);
});