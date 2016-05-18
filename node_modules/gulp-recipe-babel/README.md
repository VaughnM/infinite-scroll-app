# [gulp-recipe](https://github.com/PGSSoft/gulp-recipe-loader)-babel [![Dependency Status][depstat-image]][depstat-url]
[![NPM][npm-image]][npm-url]

Recipe for babel files compilation and js transforms application.

## Task
### babel

Compile all babel files into temp folder.

### watch:babel
> deps: 'babel'

Watch for changes on all babel files and compile them.

## Configuration
### Recipe specific
#### config.babel
> default: {}

Configure babel task. This object is directly passed into [babel](https://babeljs.io/docs/usage/options/) as options.

### [Sources](https://github.com/PGSSoft/gulp-recipe-loader#sources-configuration-syntax)
#### sources.babel
> mandatory

Source files for babel compiler. Accepts *.babel and *.js.
> example config:
```javascript
sources.babel = ['app/components/**/*.js', 'app/*.js'];
```

### Paths
#### paths.tmp
> default: 'tmp/'

Default babel output path in development mode.

### Tasks
#### tasks.babel
> default: 'babel'

_babel_ task name.

#### tasks.watchBabel
> default: 'watch:babel'

_watch:babel_ task name.

## Api
### Provided Hooks
#### pipes.devProcessJs*
> type: sequence

Process js files, the babel compiler output.

### Used Hooks
#### pipes.assetBabel

Provide compiled babel files into build as assets.

[npm-url]: https://npmjs.org/package/gulp-recipe-babel
[npm-image]: https://nodei.co/npm/gulp-recipe-babel.png?downloads=true
[depstat-url]: https://david-dm.org/PGSSoft/gulp-recipe-babel
[depstat-image]: https://img.shields.io/david/PGSSoft/gulp-recipe-babel.svg?style=flat