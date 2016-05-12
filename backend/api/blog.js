/* global _,require,exports */
(function () {
    "use strict";
    var config = require('../core/config'),
        status = require('../core/status'),
        model = require('../model'),
        db = require('../data'),
        connect = require('connect'),
        api = require('../api'),
        cons = require('../core/constant'),
        core = require('../core'),
        redis = require('../core/redis');

    exports.add = function(req, res){
        var body = req.body;
        if(!body.name){
            return res.send({code: 401});
        }
        db.BlogData.add(body, function(err, blog){
            return res.send({code: 200, data: blog});
        });
    };

})();
