'use strict';
var path = require('path');

/**
 * babel files compilation and watcher
 *
 * @param $
 * @param config
 * @param sources
 * @config paths.pipeminTmp destination temp directory
 * @config paths.tmp
 * @sequential preDevBuild Preprocess index file before it hits pipemin
 * @sequential postDevBuild Post-process index before writing to fs
 * @sequential postDevAssets Hook just after dev assets source pipe
 * @returns {*} postDevAssetsSort
 */
module.exports = function ($, config, sources) {
    var _ = $.lodash;

    var babelProcess = $.lazypipe()
        .pipe(function () {
            var streamIn = $.plumber();
            var streamOut = streamIn
                .pipe($.babel(config.babel))
                .pipe($.plumber.stop());
            return $.lazypipe().pipe(_.constant(streamIn)).pipe(_.constant(streamOut))();
        });

    var babelSource = sources.babel
        .pipe($.sourcemaps.init)
        .pipe(babelProcess);

    /**
     * Compile all babel files and store in temp directory
     *
     * @task babel
     * @config tasks.babel
     * @config sources.babel sourcess for babel compilation
     * @config paths.tmp temp folder location
     * @sequential devProcessJs runs js processors on compiled babel files
     */
    function babelTask() {
        var processJsPipe = $.utils.sequentialLazypipe($.utils.getPipes('devProcessJs'));

        return babelSource
            .pipe(processJsPipe)
            .pipe($.sourcemaps.write)
            .pipe($.gulp.dest, config.paths.tmp)();
    }

    /**
     * Runs babel watcher, compile only changed main file or all files when partial is changed
     *
     * @task watch:babel
     * @config tasks.watchBabel
     * @deps babel
     */
    function watchBabelTask() {
        var fs = require('fs');

        var processJsPipe = $.utils.sequentialLazypipe($.utils.getPipes('devProcessJs'));

        var process = $.lazypipe()
            .pipe($.sourcemaps.init)
            .pipe(babelProcess)
            .pipe(processJsPipe)
            .pipe($.sourcemaps.write)
            .pipe($.gulp.dest, config.paths.tmp);

        $.utils.watchSource(sources.babel, {name: config.tasks.watchBabel}, function (vinyl) {
            if (vinyl.event === 'unlink') {
                fs.unlink(path.join(config.paths.tmp, path.relative(vinyl.base, vinyl.path).replace(/\.s(?:a|c)ss$/, '.js')));
            }
        }).pipe(process)();
    }

        $.utils.maybeTask(config.tasks.babel, babelTask);
        $.utils.maybeTask(config.tasks.watchBabel, watchBabelTask);

    return {
        /**
         * @hooks pipes.asset* provide compiled babel files
         */
        pipes: {
            assetBabel: babelSource
        },

        compile: config.tasks.babel,
        watch: config.tasks.watchBabel
    };
};