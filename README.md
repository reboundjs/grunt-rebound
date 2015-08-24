<p align="center">
  <img src="http://reboundjs.com/assets/images/logos/large.svg" alt="Rebound Logo" width="420px" />
</p>
<h1 align="center">grunt-rebound</h1>

> Easily compile your Rebound templates using Grunt.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-rebound --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-rebound');
```

## The "rebound" task

### Overview
In your project's Gruntfile, add a section named `rebound` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  rebound: {
    compile:{
      options: {
        baseUrl: 'views/',
        baseDest: 'templates/'
      },
      src: ['views/**/*', '!views/layouts/**', '!views/emails/**'],
      dest: 'public/templates'
    }
  }
});
```

### Options

#### options.baseUrl
Type: `String`
Default value: `''`

The root folder that all your uncompiled Rebound templates' HTML `<import>` tags are relative to. Ex: If your templates are all in the directory `/views` and your HTML import tags are written relative to that directory, then your baseUrl is `views/`. Please note the trailing slash.

#### options.baseDest
Type: `String`
Default value: `''`

A string value that is prefixed to all of your compiled Rebound templates' dependancy paths. Should be set to the directory path in your pubilc directory that the templates are installed. Ex: If your public directory is `/public` and your templates are compiled to `/public/templates` then your baseDest will be `templates/`. Please note the trailing slash.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
