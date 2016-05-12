/*global exports,require*/

if (typeof exports !== 'undefined') {
    config = require('../core/config');
    status = require('../core/status');
    model = require('../model');
    db = require('../data');
    _ = require('lodash');
} else {
    throw new Error('index.js must be loaded as a module.');
}

exports.blog = require('./blog');
