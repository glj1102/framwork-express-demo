/*global exports,require */
(function () {
    "use strict";
    if (typeof exports !== 'undefined') {
        var uuid = require('node-uuid');
        var moment = require('../moment-tz');
    } else {
        throw new Error('util.js must be loaded as a module.');
    }


    exports.guid = function () {
        var str = uuid.v4();

        var regex = new RegExp('-', 'g');
        str = str.replace(regex, '');

        return str;
    };

    exports.getUtcOffsetDiffMillisecond = function (zoneKey) {
        var now = moment();
        now.tz(zoneKey || "Asia/Hong_Kong"); // your time zone, not necessarily the server's
        var utcOffset = now.utcOffset();
        return utcOffset * 60 * 1000;
    }

})();

