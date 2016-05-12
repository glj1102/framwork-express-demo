/*global exports,require,redis*/
(function () {
    "use strict";
    if (typeof exports !== 'undefined') {
        var redis = require('redis'),
            config = require("./config"),
            grcli = null;
    } else {
        throw new Error('redis.js must be loaded as a module.');
    }

    function newClient() {
        //var rc = redis.createClient();  // no auth
        if (!grcli) {
            grcli = redis.createClient(config.redis_server.port, config.redis_server.host, {max_attempts: 3});  // with auth
            if(config.redis_server.password){
                grcli.auth(config.redis_server.password);
            }
            grcli.on("error", function (err) {
                console.log(err, "Fatal: Redis Error");
            });
        }
        return grcli;
    }

    exports.getSubCli = function () {
        //var rc = redis.createClient();  // no auth
        var rc = redis.createClient(config.redis_server.port, config.redis_server.host);  // with auth
        if(config.redis_server.password){
            rc.auth(config.redis_server.password);
        }
        rc.on("error", function (err) {
            logger.error(err, "Redis Error");
        });
        return rc;
    };

    exports.createClient = function () {
        return newClient();
    };

    exports.del = function (key, fn) {
        var rc = newClient();
        rc.del(key, fn);
    };

    exports.set = function (key, value, fn) {
        var rc = newClient();
        rc.set(key, value, fn);
    };

    exports.expire = function (key, seconds, fn) {
        var rc = newClient();
        rc.expire(key, seconds, fn);
    };

    exports.rpush = function (key, value, fn) {
        var rc = newClient();
        rc.rpush(key, value, fn);
    };

    exports.lpush = function (key, value, fn) {
        var rc = newClient();
        rc.lpush(key, value, fn);
    };

    exports.rpop = function (key, fn) {
        var rc = newClient();
        rc.rpop(key, fn);
    };

    exports.llen = function (key, fn) {
        var rc = newClient();
        rc.llen(key, fn);
    };

    exports.sadd = function (key, value, fn) {
        var rc = newClient();
        rc.sadd(key, value, fn);
    };

    exports.srem = function (key, value, fn) {
        var rc = newClient();
        rc.srem(key, value, fn);
    };

    exports.smembers = function (key, fn) {
        var rc = newClient();
        rc.smembers(key, fn);
    };

    exports.hset = function (key, filed, value, fn) {
        var rc = newClient();
        rc.hset(key, filed, value, fn);
    };

    exports.keys = function (key, fn) {
        var rc = newClient();
        rc.keys(key, fn);
    };

    exports.hkeys = function (key, fn) {
        var rc = newClient();
        rc.hkeys(key, fn);
    };

    exports.hget = function (key, filed, fn) {
        var rc = newClient();
        rc.hget(key, filed, fn);
    };

    exports.hdel = function (key, filed, fn) {
        var rc = newClient();
        rc.hdel(key, filed, fn);
    };

    exports.hgetall = function (key, fn) {
        var rc = newClient();
        rc.hgetall(key, fn);
    };

    exports.get = function (key, fn) {
        var rc = newClient();
        rc.get(key, fn);
    };

    exports.publish = function (key, data, fn) {
        var rc = newClient();
        rc.publish(key, data, fn);
    };

    exports.mget = function (keys, fn) {
        var client = newClient();
        client.mget(keys, fn);
    };

    exports.incr = function(key, fn){
        var client = newClient();
        client.incr(key, fn);
    };

    exports.smembers = function(key, fn){
        var client = newClient();
        client.smembers(key, fn);
    }
})();
