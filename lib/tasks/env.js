module.exports = function (envName, config) {
    console.log(JSON.stringify(config.environments[envName], null, 2));
};