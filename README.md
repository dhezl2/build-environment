##Intro##
This is a boilerplate development/build environment for front-end development. Tools are included for building, testing, creating JS documentation, and operating a continuous build server.

####Building####
Automated build will compile .jade and .sass files, compile ([Browserify](http://www.browserify.org)) CommonJS modules, minify the compiled Javascript and CSS, and clean out all extraneous files created in the process.

####Testing####
Currently, the environment supports unit and integration testing using [Mocha](http://visionmedia.github.io/mocha/) and [Chai](http://chaijs.com/).  This can be run in a headless fashion with PhantomJS, or run in the browser at `test/index.html`.

####Documentation####
Javascript module documentation is supported with inclusion of [YUIdoc](http://yui.github.io/yuidoc/). The `docs/` directory will be created upon first build.

####Serving####
The current configuration is to use grunt-contrib-watch to watch for changes made to source and test files, and grunt-contrib-connect to keep those changes active. This environment also supports the [LiveReload](http://livereload.com/) plugin.

##How to use##
This environment requires both [node.js](http://www.nodejs.org) and [npm](http://www.npmjs.org) to be installed. It is also helpful to have a global intallation of [Grunt](http://www.gruntjs.com).
All necessary modules are listed in `package.json`.  To set up the environment, simply clone it and run the following:

    $npm install
    $grunt build

This will install all necessary dependencies and create the `docs/` and `build/` directories.

####Tasks####
***grunt***: Use of the default `grunt` command will create a build and start up the local server on port 4000.  In the current configuration within `gruntfile.js`, this will also listen for any changes to the source code (or test harness), and rebuild the project and documentation accordingly. If you are using the LiveReload plugin for Chrome, this will also automatically clear local caches and reload the page.

***grunt build***: Useful if you only want to manually build the files without watching for updates.

##Where to go from here##
This is obviously a work in progress, and just a tool for setting up personal projects that is in line with how I am personally working at present. I'll probably add either Backbone or Angular support into this soon, and am considering switching testing from Mocha to Jasmine, as well as using something like Selenium to automate browsers.  We'll see.

One thing that does need doing:  At present, there is a bit of wonkiness in the task flow that can occasionally give rise to running unit tests more than once.  That doesn't really bug me too much at present, but it probably will before long.  I'll fix it soonish.

Something perhaps more pressing to include: Right now, a fresh build is begun by cleaning the current build. Before the task completes, linting and unit testing are done, which could cause a fresh build to fail. A more proper course of action would be to spawn a temporary directory, build to that, lint and test.  If the build passes, copy it over to the main build directory and delete the temporary directory.  If it fails, simply delete the temp directory, and the old build remains active.  I'll get on that.
