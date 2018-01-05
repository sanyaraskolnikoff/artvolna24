var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var newer = require('gulp-newer');
var htmlmin = require('gulp-html-minifier2');
var htmlclean = require('gulp-htmlclean');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        },
        browser: "google-chrome-stable"
    });
});

gulp.task('less', function() {
    return gulp.src('src/less/!(_)*.less')
            .pipe(newer('src/css/'))
            .pipe(less())
            .pipe(autoprefixer({
                browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7']
    }))
            .pipe(gulp.dest('src/css/'))
            .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src([
        'src/js/*.js',
        '!src/js/main.js',
        '!src/js/libs.js'
    ])
            .pipe(newer('src/js/main.js'))
            .pipe(concat('main.js'))
            .pipe(gulp.dest('src/js'));
});

gulp.task('libs-js', function () {
    return gulp.src([
        'src/libs/jquery/dist/jquery.js',
        'src/libs/twentytwenty/js/jquery.event.move.js',
        'src/libs/twentytwenty/js/jquery.twentytwenty.js',
        'src/libs/slick-carousel/slick/slick.js'
    ])
            .pipe(newer('src/js/libs.js'))
            .pipe(concat('libs.js'))
            .pipe(gulp.dest('src/js'));
});

gulp.task('libs-css', function() {
    return gulp.src([
        'src/libs/normalize-css/normalize.css',
        'src/libs/twentytwenty/css/twentytwenty.css',
        'src/libs/slick-carousel/slick/slick.css',
        'src/libs/font-awesome/css/font-awesome.css'
    ])
            .pipe(newer('src/css/libs.css'))
            .pipe(concat('libs.css'))
            .pipe(autoprefixer())
            .pipe(gulp.dest('src/css'));
});

gulp.task('libs-fonts', function() {
    return gulp.src([
        'src/libs/font-awesome/fonts/*',
        'src/libs/slick-carousel/slick/fonts/*'
    ])
            .pipe(newer('src/fonts/'))
            .pipe(gulp.dest('src/fonts'));
});

gulp.task('libs-images', function() {
    return gulp.src([
        'src/libs/slick-carousel/slick/ajax-loader.gif'
    ])
            .pipe(newer('src/images/'))
            .pipe(gulp.dest('src/images'));
});

gulp.task('libs', ['libs-js', 'libs-css', 'libs-fonts', 'libs-images']);

gulp.task('watch', ['browser-sync', 'less', 'js', 'libs'], function() {
    gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch([
        'src/js/*.js',
        '!src/js/main.js',
        '!src/js/libs.js'
    ], ['js']);
    //gulp.watch('src/css/*.css', browserSync.reload)
    gulp.watch('src/js/*.js', browserSync.reload);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/images/**/*', browserSync.reload);
    gulp.watch('src/fonts/**/*', browserSync.reload);
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('build', ['clean', 'less', 'js', 'libs'], function () {
    gulp.src([
        'src/css/main.css',
        'src/css/libs.css',
        'src/css/lib-themes.css'
    ])
            .pipe(cssnano())
            .pipe(gulp.dest('dist/css/'));
    
    gulp.src('src/js/main.js')
            .pipe(uglify())
            .pipe(gulp.dest('dist/js/'));
    gulp.src('src/js/libs.js')
            .pipe(uglify())
            .pipe(gulp.dest('dist/js/'));
    
    gulp.src('src/images/**/*')
            .pipe(gulp.dest('dist/images'));
    
    gulp.src('src/fonts/**/*')
            .pipe(gulp.dest('dist/fonts/'));
    
    gulp.src(['src/*.*', '!src/*.html'])
            .pipe(gulp.dest('dist/'));
    
    gulp.src('src/*.html')
            //.pipe(htmlmin({collapseWhitespace: true}))
            .pipe(htmlclean())
            .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['watch']);