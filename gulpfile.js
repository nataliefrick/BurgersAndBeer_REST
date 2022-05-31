require("gulp/package.json");
// import functions and set to command
const {src, dest, watch, series, parallel} = require('gulp');
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const sass          = require('gulp-sass')(require('sass')); // error: can't find 'sass'
sass.compiler = require('node-sass');
const postcss       = require('gulp-postcss');
const cssnano       = require('cssnano');
const sourcemaps    = require('gulp-sourcemaps');

const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
// const uglify = require('gulp-terser'); use terser instead
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');

// create functions
// search for files
const files = {
    htmlPath:"src/**/*.html",
    jsPath:"src/**/*.js",
    imgPath:"src/img/*.*",
    sassPath:"src/scss/*.scss"
}

// HTML task: copy files
function copyHTML() {
    return src(files.htmlPath) // fetch files and returns msg when complete
    .pipe(dest('pub')) //copy into pub directory
    .pipe(browserSync.stream())
    ;
}

// compiling CSS from SASS and SCSS
function sassTask() {
    return src(files.sassPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        //.pipe(postcss([cssnano()])) // minify code
        .pipe(sourcemaps.write('./maps'))
        .pipe(dest("pub/css/")) 
        .pipe(browserSync.stream())
        ;
}

// SCSS
// function compilescss() {
//     return src(files.sassPath)
//         // .pipe(sourcemaps.init())
//         .pipe(sass())
//         // .pipe(prefix('last 2 versions'))
//         // .pipe(minify())
//         // .pipe(sourcemaps.write('./maps'))
//         .pipe(dest('/pub/css'))
//         .pipe(browserSync.stream())
//         ;
// }

// JS task: combine (concatenate) and minify js files
function jsTask() {
    return src(files.jsPath, { sourcemaps: true} )
    .pipe(concat('main.js'))
    .pipe(terser()) // minifying 
    .pipe(dest('pub/js'))
    .pipe(browserSync.stream())
    ;
}

// JS
// function jsmin(){
//     return src('src/js/*.js')
//         .pipe(terser())
//         .pipe(dest('dist/js'))
// }

// images
function optimizeimg() {
    return src('src/img/*.{jpg,png}')
        .pipe(imagemin([
            imagemin.mozjpeg({quality: 80, progressive: true}),
            imagemin.optipng({optiminzationLevel: 2})
        ]))
        .pipe(dest('pub/img'))
}

// IMG task: copy over image files to pub dir
function copyImg() {
    return src(files.imgPath)
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('pub/img'));
}


// webp images
// function webpImage() {
//     return src('pub/img/*.{jpg, png}')
//         .pipe(imagewebp())
//         .pipe('pub/img')
// }


// create watchlist
function watchTask(){
    browserSync.init({ // initialize the server
        server: './pub' // Root dir where index.html is located
        }
    );

    watch([files.htmlPath, files.jsPath, files.sassPath, files.imgPath], 
        parallel(copyHTML, copyImg, jsTask, sassTask, optimizeimg, )).on('change', browserSync.reload); //compilescss  
}




// default gulp
exports.default = series(
    copyHTML,
    // compilescss,
    jsTask,
    sassTask,
    copyImg,
    // jsmin,
    optimizeimg,
    // webpImage,
    watchTask
);