# better-ionic-template

A better template for starting an Ionic project. Uses [CoffeeScript](http://coffeescript.org/), [Slim](http://slim-lang.com/) instead of JavaScript and HTML.
It is also setup to use a component-based file hierarchy.

### Setup

1. Start a new ionic v1.0.0-beta.13 project
2. Remove `www`, `styles`, `gulpfile.js`, `bower.json`, and `package.json`*
3. Copy in the contents of this repo
4. Run `npm install && bower install` to install dependencies
5. Run `gulp build && gulp inject` to build assets and inject them into `index.html`
6. Run `gulp watch` to watch for changes. Due to the nature of the [gulp-watch](https://github.com/floatdrop/gulp-watch) plugin, you must restart `gulp watch` when you create a new file.
7. Make only changes in the `src` folder
