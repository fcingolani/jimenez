var path = require('path');
var _    = require('lodash');

var build = require('./build');

module.exports = function (config) {

    _.each(config.environments, function (v, envName){
        var envConfig = _.cloneDeep(config);
        envConfig.outputDir = path.join(envConfig.outputDir, envName);
        build(envName, envConfig);
    });

};