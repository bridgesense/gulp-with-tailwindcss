# Gulp with TailwindCSS Starter Kit

Gulp with TailwindCSS v3 Starter Kit 

A repo which makes your development easier with predefined gulp tasks that
help you to use tailwindcss with simple commands.

## Included Tailwind Plugins

- @tailwindcss/forms
- @tailwindcss/line-clamp
- @tailwindcss/typography


# Why this Deviation?
Initially, I was looking for a script to deploy all assets of
[TailwindCSS](https://tailwindcss.com/) 
methodically. I stumbled on Manjunath's excellent gulp script. The first
question that came to my mind was, why doesn't the original TailwindCSS
distribution include a script like this?

Well, the changes made for the production environment have deviated so far
from the intent of Manjunath's original work that this fork will likely be
a permanent feature.

[Typescript](https://www.typescriptlang.org/) is now part of the compilation
process. During the build stages for production, all HTML and custom
scripting is minified.

The build process (yarn prod) cleans and creates a brand new destination
directory instead of utilizing assets built during the development stage (yarn dev).

Both script and style assets from [node modules](https://www.npmjs.com/) can
easily be added as part of the build process and minified into a single file.

As demonstrated in the original script, all <b>image assets</b> are optimized
during the deployment state (yarn prod).

## Usage

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

## Configuration

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
        img: "./src/img",
        font: "./src/fonts"
     },
     dev: {
         base: "./public_html",
         css: "./public_html/css",
         js: "./public_html/js",
         img: "./public_html/img",
         font: "./src/fonts"
     },
     dist: {
         base: "./public_html",
         css: "./public_html/css",
         js: "./public_html/js",
         img: "./public_html/img",
         font: "./src/fonts"
     }
  }
  ...
}
```

## Include More Files Easily 

These settings can be changed in the **gulpfile.js** file.

Live changes to this file aren't handled by `yarn dev`.

```js
const jsScripts = [
    // Add additional node modules below as in the following examples.
    // `./node_modules/jquery/dist/jquery.js`,
    // `./node_modules/jquery-validation/dist/jquery.validate.js`,
    // `./node_modules/tw-elements/dist/js/**/*.js`,

    `${options.paths.src.js}/libs/**/*.js`,
];

const externalScripts = [
    // Files in /src/js/external should be sourced separately.

    `${options.paths.src.js}/external/**/*`,
];

const tsScripts = [
    // Place custom Javascript and Typescript in the /src/js/libs directory. 

    `${options.paths.src.js}/libs/**/*.ts`,
];

const cssScssStyles = [
    // Place custom CSS and SASS files in the /src/css directory.

    `${options.paths.src.css}/**/*.scss`
];


const auxDirectories = [
    // Place file directories for files to be synced and referenced as is.
    
    `${options.paths.src.base}/additional_stuff/**/*`, 
];

const auxFiles = [
    // Place custom PHP and server side scripts in the /src directory where needed.

    `${options.paths.src.base}/**/{*.,.}{htaccess,php,txt}`
];
...
```
