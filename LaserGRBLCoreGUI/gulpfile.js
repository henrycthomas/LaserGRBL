/// <binding ProjectOpened='default' />
var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  less = require('gulp-less'),
  concat = require('gulp-concat'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  print = require('gulp-print');

var appList = [
    './scripts/app/app.js',
    './scripts/app/**/*.js'
];


var vendorList = [
    './scripts/vendor/angular-js-router.min.js',
    './scripts/vendor/**/*.js'
];

var lessFiles = [
    './content/src/less/**/*.less'
];


var cssFilesToBundle = [
    "./content/src/css/foundation-flex.css",
    "./content/src/css/global.css",
    "./content/src/css/capture.css",
    "./content/src/css/rzslider.css"
];

var filesToBeCopiedFromPackages = [
    './node_modules/angular-messages/angular-messages.min.js',
    './node_modules/moment/min/moment.min.js',
    './node_modules/numeral/min/numeral.min.js',
    './node_modules/angular-sanitize/angular-sanitize.min.js'
];

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(appList, ['compile-app']);
    gulp.watch(lessFiles, ['minify-css']);
    gulp.watch(cssFilesToBundle, ['minify-css']);
});

gulp.task('copyPackageScriptsToVendor', function() {
    return gulp.src(filesToBeCopiedFromPackages)
        .pipe(gulp.dest('./scripts/vendor'));
});


gulp.task('compile-app', function() {
    return gulp.src(appList)
       .pipe(concat('app.js'))
       .pipe(gulp.dest('./public/js'));
});

gulp.task('compile-vendor', ['copyPackageScriptsToVendor'], function () {
    return gulp.src(vendorList)
         .pipe(concat('vendor.js'))
         .pipe(gulp.dest('./public/js'));
});


gulp.task('compile-less', function () {
    return gulp.src('./content/src/less/global.less')
        .pipe(less())
        .pipe(gulp.dest('./content/src/css/'))
    .pipe(livereload());
});

gulp.task('minify-css', ['compile-less'], function () {
    return gulp.src(cssFilesToBundle)
        .pipe(concat('site.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./content/dist/css/'));
});



gulp.task('compile', ['compile-app', 'compile-vendor']);
gulp.task('compile-styles', ['minify-css']);

gulp.task('full-build', ['compile', 'compile-styles']);

gulp.task('default', [
    'compile',
    'compile-styles',
    'watch'
]);