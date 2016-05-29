var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var concat       = require('gulp-concat');
var eslint       = require('gulp-eslint');
var autoprefixer = require('gulp-autoprefixer');
var rename       = require('gulp-rename');
var replace      = require('gulp-replace');
var argv         = require('yargs').argv;
var gutil        = require('gulp-util');

var reload       = browserSync.reload;

var src = {
    scss: 'app/assets/css/*.scss',
    css:  'app/assets/css',
    html: 'app/*.html',
    jsSource:  [
                /**
                 * Loading _settings.js first,
                 * it's got api key
                 * and adds strict mode statement to the whole app
                 */
                'app/assets/js-source/_settings.js',
                'app/assets/js-source/!(main)*.js',
                /**
                 * Loading main.js last,
                 * it initializes the app
                 */
                'app/assets/js-source/main.js'
                ],
    jsLint: 'app/assets/js-source/*.js',
    js:   'app/assets/js/'
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass','js'], function() {

    browserSync({
        server: "./app"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.jsSource, ['js']);
    gulp.watch(src.html).on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

// Do js magic
gulp.task('js', function() {
    return gulp.src(src.jsSource)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(src.js))
        .pipe(reload({stream: true}));
});

gulp.task('lint', function () {
    return gulp.src(src.jsLint)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('lint-watch', function() {
    gulp.watch(src.jsLint, ['lint']);
});

gulp.task('init', function() {
    var oldString = "access_token: ''";
    var newString = "access_token: '" + argv.access_token + "'";

    gulp.src('app/assets/js-source/_settings.example')
        .pipe(replace(oldString, newString))
        .pipe(rename('_settings.js'))
        .pipe(gulp.dest('app/assets/js-source/'));

    return gutil.log('API access_token added,',
            'settings file initialized,',
            'app ready to use\n',
            gutil.colors.green('please run $ gulp serve'));
});

gulp.task('default', ['serve']);
