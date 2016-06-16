'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var sassOptions = {
	outputStyle: 'expanded'
};

var sassFilter = '/**/*.+(scss|sass)';

gulp.task('build', function() {
	buildStyles();
});

gulp.task('build:watch', function() {
	gulp.watch(path.join(conf.paths.src, sassFilter) ,['build']);
});

function buildStyles() {
	gulp.src([
		path.join(conf.paths.src, sassFilter)
	])
	.pipe($.flatten())
	.pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
	.pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
	.pipe(gulp.dest(path.join(conf.paths.dist, '/parts')))
	.pipe($.concat({ path: 'acssist.css', stat: { mode: "0666" }}))
	.pipe(gulp.dest(path.join(conf.paths.dist, '/')))
	.pipe($.cssnano())
	.pipe($.rename({
        suffix: '.min'
    }))
	.pipe(gulp.dest(path.join(conf.paths.dist, '/')));
}