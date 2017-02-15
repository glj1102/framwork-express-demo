(function () {
    'use strict';
    var _ = require("lodash");
    var moment = require('moment');
    var tz = require("moment-timezone");

    var toFullDateTimeNumber = function (date) {
        if (date.toString().length <= 10) {
            return date * 1000;
        } else {
            return date;
        }
    };


    /**
     * convert the timezone with the same time stamp, please use the format() directly as normal
     */
    var _moment = function (value, timezone) {

        var timezones = {
            UTC    : {
                id      : 'UTC',
                    timezone: 'UTC',
                    offset  : 0,
                    key     : 'Etc/UTC'
            },
            Beijing: {
                id      : 'Beijing',
                    timezone: 'CST',
                    offset  : 8,
                    key     : 'Asia/Hong_Kong'
            },
            Tokyo  : {
                id      : 'Tokyo',
                    timezone: 'CST',
                    offset  : 9,
                    key     : 'Asia/Tokyo'
            }
        };

        if (_.isNumber(value)) {
            value = toFullDateTimeNumber(value);
        } else if (_.isString(value) && value * 1 > 0) {
            value = toFullDateTimeNumber(value * 1);
        }

        if (timezone) {
            var tzObject = timezones[timezone];
            var key = tzObject ? tzObject.key : timezones.Beijing.key;
            if (value) {
                return moment(value).tz(key);
            } else {
                return moment().tz(key);
            }
        } else if (value) {
            return moment(value);
        } else {
            return moment();
        }
    };

    exports = module.exports = _moment;
})();