/*global exports,require */
(function () {
    "use strict";
    if (typeof exports !== 'undefined') {
        var uuid = require('node-uuid');
    } else {
        throw new Error('util.js must be loaded as a module.');
    }


    exports.guid = function () {
        var str = uuid.v4();

        var regex = new RegExp('-', 'g');
        str = str.replace(regex, '');

        return str;
    };

})();

