/**
 *   Gulp with TailwindCSS - An CSS Utility framework build setup with SCSS
 *   Author : Manjunath G
 *   URL : manjumjn.com | lazymozek.com
 *   Twitter : twitter.com/manju_mjn
 **/

/**
 *   Altered for Deployment : BridgeSense.com LLC
 **/

/*
  Usage:
  1. npm install //To install all dev dependencies of package
  2. npm run dev //To start development and server for live preview
  3. npm run prod //To generate minifed files for live server
*/

const { src, dest, task, watch, series, parallel } = require("gulp");
const clean = require("gulp-clean"); //For Cleaning build/dist for fresh export
const options = require("./config"); //paths and other options from config.js
const browserSync = require("browser-sync").create();

const sass = require("gulp-sass")(require("sass")); //For Compiling SASS files
const postcss = require("gulp-postcss"); //For Compiling tailwind utilities with tailwind config
const concat = require("gulp-concat"); //For Concatinating js,css files
const uglify = require("gulp-terser"); //To Minify JS files
const imagemin = require("gulp-imagemin"); //To Optimize Images
const cleanCSS = require("gulp-clean-css"); //To Minify CSS files
const purgecss = require("gulp-purgecss"); // Remove Unused CSS from Styles
const logSymbols = require("log-symbols"); //For Symbolic Console logs :) :P
const ts = require('gulp-typescript'); // Typescript Processing 
const sourcemaps = require('gulp-sourcemaps'); // Sourcemap Processing
const htmlmin = require('gulp-htmlmin'); // Minify HTML Source

const jsScripts = [
    // sample node_module integration with jquery and ts-elements
    // `./node_modules/jquery/dist/jquery.js`,
    // `./node_modules/jquery-validation/dist/jquery.validate.js`,
    // `./node_modules/tw-elements/dist/js/**/*.js`,
    `${options.paths.src.js}/libs/**/*.js`,
];

const externalScripts = [
    `${options.paths.src.js}/external/**/*`,
];

const tsScripts = [
    `${options.paths.src.js}/libs/**/*.ts`,
];

const cssScssStyles = [
    `${options.paths.src.css}/**/*.scss`
];


const auxDirectories = [
    // `${options.paths.src.base}/additional_stuff/**/*`, 
];

const auxFiles = [
    `${options.paths.src.base}/**/{*.,.}{htaccess,php,txt}`
];

//Load Previews on Browser on dev
function livePreview(done) {
  browserSync.init({
    server: {
        baseDir: options.paths.dist.base,
        middleware: function (req, res, next) {
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
            res.setHeader('Access-Control-Allow-Origin', 'https://js.peek.com');
            next();
        }
    },
    port: options.config.port || 5000,
  });
  done();
}

// Triggers Browser reload
function previewReload(done) {
  console.log("\n\t" + logSymbols.info, "Reloading Browser Preview.\n");
  browserSync.reload();
  done();
}

//Development Tasks
function devHTML() {
  return src(`${options.paths.src.base}/**/*.html`)
  .pipe(dest(options.paths.dev.base));
}

function devAuxDirectories() {
    return src(auxDirectories, {base:"./src"})
      .pipe(dest(options.paths.dev.base));
}

function devAuxFiles() {
    return src(auxFiles, {base:"./src"})
      .pipe(dest(options.paths.dev.base));
}

function devStyles() {
  const tailwindcss = require("tailwindcss");
  return src(cssScssStyles)
    .pipe(sass().on("error", sass.logError))
    .pipe(dest(options.paths.src.css))
    .pipe(postcss([tailwindcss(options.config.tailwindjs)]))
    .pipe(concat({ path: "style.css" }))
    .pipe(dest(options.paths.dev.css));
}

function devExternalScripts(){
    return src(externalScripts, {base:"./asc"})
    .pipe(dest(options.paths.dev.js + "/external"));
}

function devTypescript(){
    return src(tsScripts)
    .pipe(ts({
            noImplicitAny: true,
            module: 'amd',
            outFile: 'tsbuild.js'
    }))
    .pipe(dest(options.paths.src.js + "/libs"));
}

function devJavascript() {
    return src(jsScripts)
    .pipe(concat({ path: "scripts.js" }))
    .pipe(dest(options.paths.dev.js));
}

function devImages() {
    return src(`${options.paths.src.img}/**/*`, {base:"./src"})
    .pipe(dest(options.paths.dev.img));
}

function devFonts() {
  return src(`${options.paths.src.font}/**/*`, {base:"./src"}).pipe(
    dest(options.paths.dev.font)
  );
}

function watchFiles() {
  watch(
    `${options.paths.src.base}/**/{*.,.}{html,htaccess,php,txt}`,
    series(devHTML, devAuxDirectories, devAuxFiles, previewReload)
  );
  watch(
    [options.config.tailwindjs, `${options.paths.src.css}/**/*.scss`],
    series(devStyles, previewReload)
  );
  watch(`${options.paths.src.js}/**/*.ts`, devTypescript, devJavascript, previewReload);
  watch(`${options.paths.src.js}/**/*.js`, series(devExternalScripts, devJavascript, previewReload));
  watch(`${options.paths.src.img}/**/*`, series(devImages, previewReload));
  watch(`${options.paths.src.font}/**/*`, series(devFonts, previewReload));
  console.log("\n\t" + logSymbols.info, "Watching for Changes..\n");
}

function devClean() {
  console.log(
    "\n\t" + logSymbols.info,
    "Cleaning dist folder for fresh start.\n"
  );
  return src(options.paths.dist.base, { read: false, allowEmpty: true }).pipe(
    clean()
  );
}

//Production Tasks (Optimized Build for Live/Production Sites)
function prodHTML() {
    return src(`${options.paths.src.base}/**/*.html`)
        .pipe(htmlmin({
          collapseWhitespace: true,
          removeComments: true
        }))
        .pipe(dest(options.paths.dist.base));
}

function prodAuxDirectories() {
    return src(auxDirectories, {base:"./src"})
      .pipe(dest(options.paths.dist.base));
}

function prodAuxFiles() {
    return src(auxFiles, {base:"./src"})
      .pipe(dest(options.paths.dist.base));
}

function prodStyles() {
    const tailwindcss = require("tailwindcss");
    return src(cssScssStyles)
    .pipe(sass().on("error", sass.logError))
    .pipe(dest(options.paths.src.css))
    .pipe(postcss([tailwindcss(options.config.tailwindjs)]))
    .pipe(concat({ path: "style.css" }))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(sourcemaps.write())
    .pipe(dest(options.paths.dist.css));
}

function prodExternalScripts(){
    return src(externalScripts, {base:"./src"})
    .pipe(dest(options.paths.dist.js + "/external"));
}

function prodTypescript(){
    return src(tsScripts)
    .pipe(ts({
            noImplicitAny: true,
            module: 'amd',
            outFile: 'tsbuild.js'
    }))
    .pipe(dest(options.paths.src.js + "/libs"));
}

function prodJavascript() {
    return src(jsScripts)
    .pipe(concat({ path: "scripts.js" }))
    .pipe(sourcemaps.init())
    .pipe(uglify({mangle: {toplevel: true}}))
    .pipe(sourcemaps.write())
    .pipe(dest(options.paths.dist.js));
}

function prodImages() {
  return src(options.paths.src.img + "/**/*", {base:"./src"})
    .pipe(imagemin())
    .pipe(dest(options.paths.dist.img));
}

function prodFonts() {
  return src(options.paths.src.font + "/**/*")
    .pipe(dest(options.paths.dist.font));
}

function prodClean() {
  console.log(
    "\n\t" + logSymbols.info,
    "Cleaning build folder for fresh start.\n"
  );
    return src([
        options.paths.dist.base,
        options.paths.src.js + "/libs/tsbuild.js"
    ], { read: false, allowEmpty: true }).pipe(
    clean()
  );
}

function buildFinish(done) {
  console.log(
    "\n\t" + logSymbols.info,
    `Production build is complete. Files are located at ${options.paths.dist.base}\n`
  );
  done();
}

exports.default = series(
  devClean, // Clean Dist Folder
  parallel(devStyles, series(devTypescript,devJavascript), devExternalScripts, devImages, devFonts, devHTML, devAuxillary), //Run All tasks in parallel
  livePreview, // Live Preview Build
  watchFiles // Watch for Live Changes
);

exports.prod = series(
  prodClean, // Clean Build Folder
  parallel(prodStyles, series(prodTypescript,prodJavascript), prodExternalScripts, prodImages, prodFonts, prodHTML, prodAuxillary), //Run All tasks in parallel
  buildFinish
);
