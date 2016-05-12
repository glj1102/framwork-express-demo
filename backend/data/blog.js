/*global require,exports*/
(function () {
    var config = require('../core/config'),
        fs = require('fs'),
        model = require('../model'),
        db = require('../data'),
        redis = require('../core/redis'),
        async = require('async'),
        util = require('../core/util'),
        cons = require('../core/constant');

    exports.get_list = function(fn){
        var query = {
            is_deleted: 0
        }
        model.Blog.find(query, function(err, blogs){
            console.log(blogs)
            return fn(err, blogs);
        });
    };

    exports.add = function(body, fn){
        var blog = new model.Blog({
            blog_id: util.guid(),
            name: body.name,
            content: body.content
        });
        blog.save(function(err, blog){
            return fn(err, blog)
        });
    }
})();
