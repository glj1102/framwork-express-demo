/*global exports */
(function () {
    //错误状态码
    "use strict";
    exports.ok = 200;
    exports.invalid_input = 401;
    exports.not_found = 404;

    exports.blog_err = {
        name_null            : 1001, //错误的签名
        content_null         : 1002
    };

})();
