##Intro##
This is a boilerplate development/build environment for front-end development. Tools are included for building, testing, creating JS documentation, and operating a continuous build server.

####Building####
Automated build will compile .jade and .sass files, compile (Browserify) CommonJS modules, minify the compiled Javascript and CSS, and clean out all extraneous files created in the process.

####Testing####
Currently, the environment supports unit and integration testing using Mocha and Chai.  This can be run in a headless fashion with PhantomJS, or run in the browser at 'test/index.html'.

####Documentation####
Javascript module documentation is supported with inclusion of YUIdocs. The 'docs/' directory will be created upon first build.

####Serving####
The current configuration is to use grunt-contrib-watch to watch for changes made to source and test files, and grunt-contrib-connect to keep those changes active. This environment also supports the Chrome plugin LiveReload.
