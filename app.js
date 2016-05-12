/* global process,require,console,___dirname */
(function () {
    'use strict';
    var config = require('./backend/core/config');
    config.application = "express-demo";

    var path = require('path'),
        core = require('./backend/core'),
        express = require('express'),
        app = express(),
        routes = require('./backend/route'),
        staticDir = path.join(__dirname, 'web/public'),
        viewsDir = path.join(__dirname, 'web/view'),
        ejs = require('ejs'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser'),
        expressLayouts = require("express-ejs-layouts"),
        compression = require("compression"),
        http = require('http');


    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(cookieParser());

    // view engine setup
    var oneYear = config.env === 'production' ? 31557600000 : 0;
    app.use(express.static(staticDir, {
        maxAge: oneYear
    }));
    app.set('views', viewsDir);
    app.set('view engine', 'html');
    app.engine('html', ejs.__express);
    app.set('layout', 'layout');
    app.use(expressLayouts);

    app.disable("x-powered-by");
    //启用反向代理
    app.enable('trust proxy');

    //抛出命中的服务器
    app.use(function (req, res, next) {
        res.header("X-Served-By", 'Express Demo Host ' + process.env.NODE_NAME);
        next();
    });

    var port = process.env.PORT || 8000;
    routes(app);
    http.createServer(app).listen(port, "0.0.0.0", function () {
        console.log('Express server listening on port ' + port + " in " + config.env);
    });

    if (config.env === 'production') {
        process.on("uncaughtException", function (err) {
            console.log(err, "process uncaughtException");
        });
    } else {
        app.set('json spaces', 2);
    }

    module.exports = {app: app};

})();
