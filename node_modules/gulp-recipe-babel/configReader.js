'use strict';

module.exports = function ($, config) {
    var _ = $.lodash;

    $.utils.checkMandatory(config, ['sources.babel']);

    if(_.isUndefined(config.paths.tmp)) {
        config.paths.app = 'tmp/';
    }

    config.babel = _.defaults(config.babel || {}, {
        // defaults
    });

    config.tasks = _.defaults(config.tasks || {}, {
        babel: 'babel',
        watchBabel: 'watch:babel'
    });

    config.sources = _.pick(config.sources, 'babel');
    return config;
};