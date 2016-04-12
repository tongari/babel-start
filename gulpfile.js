"use strict";
const gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    _ = require('lodash'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    assign = require('lodash.assign'),
    spritesmith = require('gulp.spritesmith'),
    browserSync = require("browser-sync"),
    glob = require('glob')


const DEST = './dist',
    SRC = './src',
    ENTRY_POINT_JS_FILE_NAME = 'app.js';

const COMPILE_PATHS = Object.freeze({
    html:   `${SRC}/html/**/*.html`,
    js:     `${SRC}/**/${ENTRY_POINT_JS_FILE_NAME}`,
    css:    [`${SRC}/**/*.scss`, `!${SRC}/**/_sprite.scss`]
});


/**
 * ------------------------
 *
 * css compile task
 *
 * ------------------------
 */


gulp.task('sprite', () => {

    glob(`${SRC}/img/**/sprite`, (err, files) => {

        files.forEach( (entry) => {

            let spritePath = `${entry}/*.{png,jpg,gif}`;
            let imgName = 'sprite.png';
            let cssName = '/_sprite.scss';
            let imgPath = 'sprite.png';

            let a = gulp.src(spritePath).pipe($.plumber()).pipe(spritesmith({
                imgName: imgName,
                cssName: cssName,
                imgPath: imgPath,
                algorithm: 'binary-tree',
                cssFormat: 'scss',
                padding: 4
            }));
            a.img.pipe(gulp.dest(DEST));
            a.css.pipe(gulp.dest(SRC));
        });
    });
});

gulp.task('sass', ['sprite'], () => {
    gulp.src(COMPILE_PATHS.css)
        .pipe($.plumber())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.pleeease({
            autoprefixer: {
                browsers: [ 'ie 10','Android 2.1']
            },
            minifier: false
        }))
        .pipe(gulp.dest(DEST));
});


/**
 * ------------------------
 *
 * html compile task
 * ------------------------
 */
gulp.task('html', () => {
    gulp.src(COMPILE_PATHS.html)
        .pipe($.plumber())
        .pipe(gulp.dest(DEST));
});


/**
 * ------------------------
 *
 * js compile task
 * ------------------------
 */
let makeJsBuild = ( entry ) => {

    let customOpts = {
        entries: [entry],
        transform: [ babelify.configure() ],
        debug: true
    };

    let opts   = assign({}, watchify.args, customOpts);
    let b      = watchify(browserify(opts));

    let bundle = () => {
        let output = entry.replace(SRC,DEST).replace(ENTRY_POINT_JS_FILE_NAME,'');

        return b.bundle()
            .on('error',  $.util.log.bind($.util), 'Browserify Error')
            .pipe($.plumber())
            .pipe(source(ENTRY_POINT_JS_FILE_NAME))
            .pipe(buffer())
            .pipe( gulp.dest( output ) );
    };

    return {
        obj: b,
        bundle: bundle
    }
};

gulp.task('browserify', () => {

    glob(COMPILE_PATHS.js, (err, files) => {
        files.forEach( (entry) => {

            let watcher = makeJsBuild(entry);
            watcher.bundle();
            watcher.obj.on('update', watcher.bundle);
            watcher.obj.on('log', $.util.log);
        });
    });

});

/**
 * ------------------------
 *
 * browser sync
 *
 * ------------------------
 */
gulp.task("browserSync", ()=> {
    browserSync({
        server: {
            baseDir:DEST
        }
    })
});

gulp.task('browserReload', function () {
    browserSync.reload();
});

/**
 * ------------------------
 *
 * usual watch task
 *
 * ------------------------
 */
gulp.task('watch', () => {
    // gulp.watch(COMPILE_PATHS.html, ['html','browserReload']);
    // gulp.watch(COMPILE_PATHS.css, ['sass','browserReload']);
    // gulp.watch(COMPILE_PATHS.js, ['browserify','browserReload']);
    gulp.watch(COMPILE_PATHS.html, ['html']);
    gulp.watch(COMPILE_PATHS.css, ['sass']);
    gulp.watch(COMPILE_PATHS.js, ['browserify']);
});

gulp.task('default', ['html','sass','browserify','watch','browserSync']);
