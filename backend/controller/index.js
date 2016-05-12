/*global require,exports,_,console*/
(function () {
    var api = require('../api'),
        db = require('../data'),
        cons = require('../core/constant'),
        config = require('../core/config'),
        request = require("request"),
        core = require("../core"),
        redis = require('../core/redis'),
        _ = require('lodash'),
        moment = require('moment');

    exports.index = function(req, res){
        var locals = {
            layout     : 'layout',
            title      : 'express demo'
        };
        db.BlogData.get_list(function(err, blogs){
            locals.data = blogs;
            return res.render("blog", locals);
        });

    };

})();
