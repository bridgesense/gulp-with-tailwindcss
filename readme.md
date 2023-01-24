# Gulp with TailwindCSS Starter Kit

Gulp with TailwindCSS v3 Starter Kit ( ~~Updated with [TailwindCSS JIT](https://github.com/tailwindlabs/tailwindcss-jit)~~ - **latest tailwind has JIT is built-in** ) - A repo which makes your development easier with predefined gulp tasks that help you to use [tailwindcss](https://github.com/tailwindcss/tailwindcss) with simple commands.

## Included Tailwind Plugins

- @tailwindcss/forms
- @tailwindcss/line-clamp
- @tailwindcss/typography


## Why this Deviation?
Initially, I was looking for a script to deploy all assets of
[TailwindCSS](https://tailwindcss.com/) 
methodically. I stumbled on Manjunath's excellent gulp script. The first
question that came to my mind, why doesn't the original TailwindCSS
distribute such a script? Well, the changes made for the production
environment have deviated so far from the intent of Manjunath's original
work that this fork will likely be a permanent feature.

[Typescript](https://www.typescriptlang.org/) is now part of the compilation
process. During the build stages for production, all HTML and custom
scripting is minified.

The build process (yarn build) cleans and creates a brand new destination
directory instead of utilizing assets built during the development stage (yarn dev).

Both script and style assets from [node modules](https://www.npmjs.com/) can
easily be added as part of the build process and minified into a single file.

As demonstrated in the original script, all <b>image assets</b> are optimized
during the deployment state (yarn build).

# Usage

1. Install Dev Depedencies

```sh
npm install // or yarn install
```

2. To start development and server for live preview

```sh
npm run dev // or yarn dev
```

3. To generate minifed files for production server

```sh
npm run prod // or yarn prod
```

# Configuration

To change the path of files and destination/build folder, edit options in **config.js** file

```sh
{
  config: {
      ...
      port: 9050 // browser preview port
  },
  paths: {
     root: "./",
     src: {
        base: "./src",
        css: "./src/css",
        js: "./src/js",
        img: "./src/img"
     },
     dev: {
         base: "./public_html",
         css: "./public_html/css",
         js: "./public_html/js",
         img: "./public_html/img"
     },
     dist: {
         base: "./public_html",
         css: "./public_html/css",
         js: "./public_html/js",
         img: "./public_html/img"
     }
  }
  ...
}
```

# Files Included

These settings can be changed in the following file **gulpfile.js** file.

Make sure `yarn dev` is executed again after changes.

```js
const jsScripts = [
    // Add additional node modules here.
    // for example:</em>
    // `./node_modules/jquery/dist/jquery.js`,
    // `./node_modules/jquery-validation/dist/jquery.validate.js`,
    // `./node_modules/tw-elements/dist/js/**/*.js`,

    `${options.paths.src.js}/libs/**/*.js`,
];

const externalScripts = [
    // Place files here to be sourced separately.
    // /src/js/exteneral

    `${options.paths.src.js}/external/**/*`,
];

const tsScripts = [
    // Place Custom Javascript and Typescript in
    // /src/js/libs</em>

    `${options.paths.src.js}/libs/**/*.ts`,
];

const cssScssStyles = [
    // Place custom CSS and SASS files in
    // /src/css</em>

    `${options.paths.src.css}/**/*.scss`
];

const auxFiles = [
    // Place custom PHP and server side scripts in
    // /src where needed</em>

    `${options.paths.src.base}/**/{*.,.}{htaccess,php,txt}`
];
...
```
