var Promise     = require('bluebird');
var fs      = Promise.promisifyAll(require('fs'));
var path    = require('path');

var _           = require('lodash');
var glob        = Promise.promisify(require('glob'));
var mkdirp      = Promise.promisify(require('mkdirp'));

var processors  = require('../processors');

function getProcesorName(filePath, rules) {
    var rule = _.find(rules, function (rule){
        return rule.test.test(filePath);
    });

    return rule ? rule.processor : 'error';
}

module.exports = function (envName, config) {

    var env             = config.environments[envName];
    var sourceDir       = path.resolve(config.sourceDir);
    var outputDir       = path.resolve(config.outputDir);

    glob(sourceDir + '/**')
        .filter(function isFile(filePath){
            return fs.statAsync(filePath)
                .then(function(stat) {
                    return stat.isFile();
                })
        })
        .then(function toObject(ary) {
            return _.reduce(ary, function (o, v){
                o[v] = v;
                return o;
            }, {});
        })
        .then(function processFiles(files){
            return _.mapValues(files, function processFile(filePath){
                var processorName = getProcesorName(filePath, config.rules);
                return processors[processorName](filePath, env);                
            });
        })
        .props()
        .then(function (files){
            return _.map(files, function (content, filePath){
 
                filePath = path.relative(sourceDir, filePath);
                filePath = path.join(outputDir, filePath);
                return {
                    content: content,
                    path: filePath
                };

            });
        })
        .each(function (file){
            var fileDir = path.dirname(file.path)
            return mkdirp(fileDir);
        })
        .each(function (file){
            return fs.writeFileAsync(file.path, file.content);
        })
        .then(function (files){
            _.each(files, function (file){
                console.log(file.path);
            });
        });

};