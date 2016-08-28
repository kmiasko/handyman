// Base Gulp File
var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  runSequence = require('run-sequence'),
  del = require('del'),
  path = require('path')
inlinesource = require('gulp-inline-source'),
$ = require('gulp-load-plugins')();

gulp.task('sass', function () {
  return gulp.src('./src/scss/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      errLogToConsole: true,
      includePaths: [
        path.join(__dirname, 'node_modules', 'ress'),
        path.join(__dirname, 'node_modules', 'bourbon/app/assets/stylesheets'),
        path.join(__dirname, 'node_modules', 'gridle/sass')
      ]
    })
    .on("error", $.notify.onError(function(error) {
      return "Failed to Compile SCSS: " + error.message;
    })))
    .pipe($.cssBase64())
    .pipe($.autoprefixer())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./src/css/'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe($.notify("SCSS Compiled Successfully :)"));
});

gulp.task('jsmin', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('./dist/js/'));
});
//
// gulp.task('imagemin', function (){
//   return gulp.src('./src/img#<{(||)}>#*.+(png|jpg|jpeg|gif|svg)')
//     .pipe($.cache($.imagemin({
//       interlaced: true
//     })))
//     .pipe(gulp.dest('./dist/img'));
// });
//
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './src/'
    }
  })
});

// Eg: <script src="default.js" inline></script>
gulp.task('inlinesource', function () {
  return gulp.src('./src/**/*.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('./dist'));
});

gulp.task('images', function() {
  return gulp.src(['./src/img/**/*.jpg', './src/img/**/*.png'])
  .pipe(gulp.dest('./dist/img'));
});

gulp.task('css-vendor', function() {
  return gulp.src('./src/css/vendor/**/*.*')
  .pipe(gulp.dest('./dist/css/vendor'));
});


gulp.task('watch', ['browserSync'], function () {
  gulp.watch('./src/scss/**/*', ['sass']);
  gulp.watch('./src/**/*.html').on('change', browserSync.reload);
});

gulp.task('clean', function() {
  del('dist');
});

gulp.task('default', ['watch']);

gulp.task('build', function() {
  runSequence('clean', 'images', 'sass', 'jsmin', 'inlinesource', 'css-vendor');
});
