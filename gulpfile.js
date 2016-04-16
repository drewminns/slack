'use strict';
var gulp = require('gulp'),
		browserify = require('browserify'),
		source = require('vinyl-source-stream'),
		buffer = require('vinyl-buffer'),
		babelify = require('babelify'),
		browserSync = require('browser-sync'),
		reload = browserSync.reload,
		scss = require("postcss-scss"),
		$ = require('gulp-load-plugins')();

const lint = [
	require('stylelint')(),
	require('postcss-reporter')({ clearMessages: true, throwError: true })
];

const postcss = [
	require('css-mqpacker')(),
	require('postcss-discard-duplicates')(),
	require('postcss-unique-selectors')(),
	require('pixrem')(),
	require('lost')(),
	require('autoprefixer')({ browsers: ['last 5 versions', '> 10%', 'IE 9']}),
	require('cssnano')(),
	require('postcss-reporter')({ clearMessages: true})
];

gulp.task('styles', () => {
	return gulp.src('./assets/styles/**/*.scss')
		.pipe($.plumber({
			errorHandler: $.notify.onError({
				title: "Style Error",
				message: "<%= error.message %>"
			})	
		}))
		.pipe($.sourcemaps.init())
		.pipe($.postcss(lint, { syntax: scss }))
		.pipe($.sass().on('error', $.sass.logError))
		.pipe($.postcss(postcss))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('./public/styles'))
		.pipe(reload({stream:true}));
});

gulp.task('scripts', () => {
	browserify('./assets/scripts/index.js')
		.transform( babelify, { presets: ['es2015', 'react', 'stage-1'] })
		.bundle().on('error', $.notify.onError({
      title: "JSX Error",
      message: "<%= error.message %>"
    }))
		.pipe(source('app.min.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('./public/scripts'))
		.pipe(reload({stream:true}));
});

gulp.task('bs', () => {
	browserSync({
		proxy: "http://localhost:3000"
	})
});

gulp.task('default', ['styles', 'scripts', 'bs'], () => {
	gulp.watch('./assets/scripts/**/*.js',['scripts']);
  gulp.watch('./assets/styles/**/*.scss', ['styles']);
});
