var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var babel       = require('gulp-babel');
var concat      = require('gulp-concat');
var reload      = browserSync.reload;

var src = {
    scss: 'app/assets/css/*.scss',
    css:  'app/assets/css',
    html: 'app/*.html',
    es6:  'app/assets/es6/*.js',
    js:   'app/assets/js/'
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass','js'], function() {

    browserSync({
        server: "./app"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.es6, ['js']);
    gulp.watch(src.html).on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass())
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

// Do js magic
gulp.task('js', function() {
    return gulp.src(src.es6)
        .pipe(sourcemaps.init())
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(src.js))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);