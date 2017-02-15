/* global _,require,exports */

var config = require('../core/config'),
    status = require('../core/status'),
    model = require('../model'),
    db = require('../data'),
    connect = require('connect'),
    api = require('../api'),
    cons = require('../core/constant'),
    core = require('../core'),
    DateRange = require('moment-range'),
    moment = require('moment');

exports.add = function (req, res) {
    var body = req.body;
    if (!body.name) {
        return res.send({code: 401});
    }
    db.BlogData.add(body, function (err, blog) {
        return res.send({code: 200, data: blog});
    });
};

exports.analytics = function (req, res) {
    var offset = core.util.getUtcOffsetDiffMillisecond();
    var range = new DateRange(1472659200000 + offset, 1488297599000 + offset);
    var monthArr = range.toArray("months");
    var months = [];
    _.each(monthArr, function (item) {
        var obj = {
            year : moment(item).year(),
            month: moment(item).month() + 1
        };
        months.push(obj);
    });
    var query = {
        is_deleted: 0
    };

    model.Blog.aggregate([
        {
            $match: query
        },
        {
            $project: {
                _id: 0,
                y  : {
                    "$year": {
                        "$add": [
                            new Date(0),
                            {"$multiply": [1000, "$created_at"]},
                            offset
                        ]
                    }
                },
                m  : {
                    "$month": {
                        "$add": [
                            new Date(0),
                            {"$multiply": [1000, "$created_at"]},
                            offset
                        ]
                    }
                }
            }
        },
        {
            $group: {
                _id  : {
                    month: "$m",
                    year : "$y"
                },
                count: {$sum: 1}
            }
        }
    ], function (err, results) {
        console.log(err);
        if (err)
            return res.send(err);
        if (results.length == months.length) {
            results = _.sortByAll(results, ['_id.year', '_id.month']);
        } else {
            _.each(months, function (item) {
                var obj = _.findWhere(results, {_id: item});
                if (!obj) {
                    results.push({_id: item, count: 0});
                }
            });
            results = _.sortByAll(results, ['_id.year', '_id.month']);
        }
        return res.send(results);
    });
};

