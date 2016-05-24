'use strict';

const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const mocha = require('gulp-mocha');
const typescript = require('typescript');

const tsProject = ts.createProject('tsconfig.json', {

});

gulp.task('default', ['test'], () => {
    gulp.watch('app/**/*.ts', ['test']);
});

gulp.task('test', ['build'], () =>
    gulp.src('dist/**/*-spec.js')
        .pipe(mocha({
            reporter: 'nyan',
            clearRequireCache: true,
            ignoreLeaks: true
        }))
);

gulp.task('build', ['ts', 'lib']);

gulp.task('ts', ['clean'], () =>
    gulp.src(['app/**/*.ts', 'typings/index.d.ts', "declarations/**/*.d.ts"])
        .pipe(ts(tsProject))
        .pipe(gulp.dest('dist'))
);

gulp.task('lib', ['clean'], () =>
    gulp.src('./node_modules/requirejs/require.js')
        .pipe(gulp.dest('dist/lib'))
);

gulp.task('clean', () => del('dist/**/**'));
