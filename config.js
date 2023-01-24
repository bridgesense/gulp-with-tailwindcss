module.exports = {
  config: {
    tailwindjs: "./tailwind.config.js",
    port: 9050,
  },
  paths: {
    root: "./",
    src: {
      base: "./src",
      css: "./src/css",
      js: "./src/js",
      img: "./src/img",
      font: "./src/fonts",
    },
    dev: {
      base: "./public_html",
      css: "./public_html/css",
      js: "./public_html/js",
      img: "./public_html/img",
      font: "./public_html/fonts",
    },
    dist: {
      base: "./public_html",
      css: "./public_html/css",
      js: "./public_html/js",
      img: "./public_html/img",
      font: "./public_html/fonts",
    },
  },
};
