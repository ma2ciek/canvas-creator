'use strict';

const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const livereload = require('gulp-livereload');
const mocha = require('gulp-mocha');
const typescript = require('typescript');
const tsProject = ts.createProject('tsconfig.json');

gulp.task('default', ['ts', 'lib']);

gulp.task('ts', ['clean'], () =>
    gulp.src('app/**/*.ts')
        .pipe(ts(tsProject))
        .pipe(gulp.dest('app'))
        .pipe(livereload({ port: 8001 }))
);

gulp.task('lib', ['clean'], () =>
    gulp.src('./node_modules/requirejs/require.js')
        .pipe(gulp.dest('./app/lib')));

gulp.task('clean', () => del('app/**/*.js'));

gulp.task('watch', () => {
    livereload.listen();
    gulp.watch('app/**/*.ts', ['default']);
    gulp.watch('test/**/*.ts', ['compileTests'])
});

gulp.task('unit', () =>
    gulp.src('test/**/*.js')
        .pipe(mocha({
            reporter: 'nyan',
            clearRequireCache: true,
            ignoreLeaks: true
        }))
)

gulp.task('compileTests', () =>
    gulp.src('test/**/*.ts')
        .pipe(ts(tsProject))
        .pipe(gulp.dest('./test'))
)