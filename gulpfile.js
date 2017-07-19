var gulp = require('gulp'),
    rimraf = require('rimraf'),
    fileinclude = require('gulp-file-include'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    jpegtran = require('imagemin-jpegtran'),
    rename = require('gulp-rename'),
    changed = require('gulp-changed'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    ftp = require('vinyl-ftp'),
    postcss = require('gulp-postcss'),
    uncss = require('postcss-uncss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require("gulp-notify"),
    browserSync = require('browser-sync');

var path = {
    build: {
        root: 'docs/',
        html: 'docs/',
        css: 'docs/css/',
        js: 'docs/js/',
        img: 'docs/img/',
        fonts: 'docs/fonts/',
        vendors: 'docs/js/vendors/'
    },
    src: {
        html: 'src/*.html',
        css: 'src/style/**/*.css',
        sass: 'src/style/**/*.scss',
        js: 'src/js/*.js',
        img: 'src/img/**/**',
        fonts: 'src/fonts/**/*.*',
        vendors: 'src/js/vendors/**/*.*',
    }
};
// SERVER
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'docs'
        },
        notify: false
    });
    gulp.watch("docs/**/*").on('change', browserSync.reload);
});



// HTML
gulp.task('html', function() {
    return gulp.src(path.src.html)
        .on("error", notify.onError())
        .pipe(fileinclude({
            prefix: '@@'
        }))
        .pipe(gulp.dest(path.build.html))
});

// CSS
var plugins = [
    // uncss({html: [ 'src/*.html' ]}),
    autoprefixer({
        browsers: ['last 2 version']
    }),
    cssnano()
];
gulp.task('css', function() {
    return gulp.src(path.src.css)
        .pipe(changed(path.build.css))
        .pipe(postcss(plugins))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.build.css))
});

gulp.task('sass', function() {
    return gulp.src(path.src.sass)
        .pipe(changed(path.build.css))
        .pipe(sourcemaps.init())
        .pipe(sass()).on("error", notify.onError())
        .pipe(postcss(plugins))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(path.build.css))
});

// JS
gulp.task('js', function() {
    return gulp.src(path.src.js)
        /*.pipe(babel({
            presets: ['es2015']
          }))*/
        .pipe(uglify())
        .on("error", notify.onError())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.build.js))
});

// IMAGES
gulp.task('image', function() {
    return gulp.src(path.src.img)
        .pipe(changed(path.build.img))
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant(), jpegtran()],
            interlaced: true
        })).on("error", notify.onError())
        .pipe(gulp.dest(path.build.img))
});


// FONTS
gulp.task('font', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// VENDORS
gulp.task('vendors', function() {
    return gulp.src(path.src.vendors)

    .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.vendors))
});

// SERVICE FILES
gulp.task('buildServiceFiles', function() {
    return gulp.src([
        'src/mail.php',
        'src/.htaccess', 'src/robots.txt'
    ]).pipe(gulp.dest('docs/'));
});

// CLEANING OF OLDER PROJECT
gulp.task('removedist', function remove(cb) {
    return rimraf('docs', cb);
});

// WATCH
gulp.task('watch', function() {
    gulp.watch(path.src.css, gulp.series('css'));
    gulp.watch(path.src.sass, gulp.series('sass'));
    gulp.watch(path.src.html, gulp.series('html'));
    gulp.watch(path.src.js, gulp.series('js'));
    gulp.watch(path.src.img, gulp.series('image'));
    gulp.watch(path.src.fonts, gulp.series('font'));
    gulp.watch(path.src.vendors, gulp.series('vendors'));
});

// DEPLOY
gulp.task('deploy', function() {
    var conn = ftp.create({
        host: 'ftp.host',
        user: 'username',
        password: 'parol',
        parallel: 21,
        log: gutil.log
    });

    var globs = [
        'docs/**',
    ];
    return gulp.src(globs, {
            buffer: false
        })
        .pipe(conn.dest('/www/'));
});

gulp.task('default', gulp.series(
    'removedist',
    gulp.parallel('buildServiceFiles',
        'html', 'image', 'css', 'sass',
        'js', 'font', 'vendors'),
    gulp.parallel('watch', 'browserSync')
));