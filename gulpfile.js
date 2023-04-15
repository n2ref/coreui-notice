const gulp       = require('gulp');
const concat     = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify     = require('gulp-uglify');
const cleanCSS   = require('gulp-clean-css');



var conf = {
    dist: "./dist",
    js: {
        file: 'coreui-notice.min.js',
        src: [
            'src/js/coreui.notice.js',
            'src/js/coreui.notice.instance.js',
        ]
    },
    css: {
        file: 'coreui-notice.min.css',
        src: [
            'src/css/coreui.notice.css',
        ]
    }
};



gulp.task('build_css', function(){
    return gulp.src(conf.css.src)
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(concat(conf.css.file))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_css_fast', function(){
    return gulp.src(conf.css.src)
        .pipe(sourcemaps.init())
        .pipe(concat(conf.css.file))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});


gulp.task('build_js', function() {
    return gulp.src(conf.js.src)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat(conf.js.file, {newLine: ";\n"}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_js_fast', function() {
    return gulp.src(conf.js.src)
        .pipe(sourcemaps.init())
        .pipe(concat(conf.js.file, {newLine: ";\n"}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});


gulp.task('build_watch', function() {
    gulp.watch(conf.css.src, gulp.series(['build_css_fast']));
    gulp.watch(conf.js.src, gulp.parallel(['build_js_fast']));
});

gulp.task("default", gulp.series(['build_js', 'build_css']));