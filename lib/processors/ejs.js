var Promise  = require('bluebird');
var ejs      = require('ejs');

ejs.renderFileAsync = Promise.promisify(ejs.renderFile);

module.exports = function (path, env) {
    return ejs.renderFileAsync(path, env);
};