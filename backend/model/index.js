/*global exports,require,console*/

var db = require('mongoose'),
    core = require('../core'),
    config = require('../core/config');

var connect = function () {
    //var options = { server: { socketOptions: { keepAlive: 1 } } }
    db.connect(config.mongo_server, { config: { autoIndex: false } }, function (err) {
        if (err) {
            console.log(err, "connect mongodb");
        } else {
            console.log("connect mongodb successfully...");
        }
    });
};

var is_normal_exit = false;

// Error handler
db.connection.on('error', function (err) {
    console.log(err, "Fatal: mongoose.connection error.");
});

// Reconnect when closed
db.connection.on('disconnected', function () {
    console.log("mongoose.disconnected, process exit.");
    if (is_normal_exit) {
        process.exit(0);
    } else {
        process.exit(27017);
    }
});

// Connect mongodb
connect();

process.on('SIGINT', function () {
    console.log('Mongoose disconnected through app termination');
    is_normal_exit = true;
    db.connection.close(function () {
        process.exit(0);
    });
});

// models
require('./blog');



exports.Blog = db.model('blog');
