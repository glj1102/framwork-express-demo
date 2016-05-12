/*global process,require,module*/
(function () {
    var packageJson = require("../../../package.json");
    var _ = require('lodash');

    var config = {};
    var init_settings = function () {
        var env = process.env.NODE_ENV;

        if (!env || env.toLowerCase() === "dev" || env.toLowerCase() === "development") {
            env = "development";
        } else if (env.toLowerCase() === "prod" || env.toLowerCase() === "production") {
            env = "production";
        }
        config.env = env;
        _.merge(config, require("./" + env));
    };

    init_settings();

    module.exports = config;
})();
