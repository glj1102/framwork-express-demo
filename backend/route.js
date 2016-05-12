/*global require,module,exports,config*/
(function () {
    module.exports = function (app) {
        var ctrl = require('./controller/index'),
            api = require('./api/index'),
            core = require('./core'),
            config = require('./core/config'),
            interceptor = require('express-interceptor');

        app.locals.config = config;
        //restful api route
        app.post('/blog/add', api.blog.add);

        //web application route
        app.get('/', ctrl.index);

    };
})();


