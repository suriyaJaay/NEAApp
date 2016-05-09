/// <binding BeforeBuild='default' />
"use strict";

var gulp = require('gulp');

gulp.task('default', function () {
    gulp.src('./node_modules/requirejs/require.js')
    .pipe(gulp.dest('./public/javascripts/'));
});