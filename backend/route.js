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
        app.get('/blog/analytics', api.blog.analytics);

        //web application route
        app.get('/', ctrl.index);
    };
})();


