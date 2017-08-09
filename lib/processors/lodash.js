var Promise = require('bluebird');
var _ = require('lodash');

var readFile = Promise.promisify(require("fs").readFile);

module.exports = function (path, env) {
    return readFile(path).then(function (contents){
        var template = _.template(contents)
        return template(env);
    });    
};