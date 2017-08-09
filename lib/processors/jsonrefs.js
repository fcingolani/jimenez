var Promise  = require('bluebird');
var JsonRefs = require('json-refs');

module.exports = function (path, env) {
    var obj = require(path);
    obj.env = env;
    return JsonRefs.resolveRefs(obj).then(function (res) {
        delete res.resolved.env;
        return JSON.stringify(res.resolved, null, 2);
    });
};