var envVariables = require('./environment_config.js');
var databaseURL = "mongodb://" + envVariables.axpUsername() + ":" + envVariables.axpPassword() + "@localhost:27017/axp";
var databaseURL2 = "mongodb://" + envVariables.axpUsername() + ":" + envVariables.axpPassword() + "@ds049722-a0.mongolab.com:49722,ds049722-a1.mongolab.com:49722/axp?replicaSet=rs-ds049722";

var dbUrl;
if (process.env.NODE_ENV == 'production') {
    dbUrl = databaseURL2;
} else {
    dbUrl = databaseURL;
}

//THE APP
var Promise = require('bluebird');
var express = require('express');
var params = require('express-params');
var app = require('express')();
params.extend(app);
var server = require('http').Server(app);
var port = process.env.PORT || process.argv[3] || 4000;
var fs = Promise.promisifyAll(require('fs'));
var fse = Promise.promisifyAll(require("fs-extra"));
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
var compression = require('compression');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var redis = Promise.promisifyAll(require("redis"));
var mongoose = Promise.promisifyAll(require("mongoose"));
Promise.promisifyAll(require("request"));
var rq = require('./rq.js');

console.log('SUCCESSFULLY RESTARTED APPLICATION');
console.log("ENVIRONMENT = " + process.env.NODE_ENV);


//mongoose.set('debug', true);
mongoose.connect(dbUrl);
var mongooseDb = mongoose.connection;
mongooseDb.on('error', console.error.bind(console, 'connection error: Problem while attempting to connect to database'));
mongooseDb.once('open', function () {
    console.log("Successfully connected to mongodb database");
});

app.use(compression());
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());
app.use(bodyParser.json());

app.post('/api/db/save', function (req, res) {
    var mongooseObj = req.body.mongooseObj;

    console.log("Got save");

    return rq.crud_db().save(mongooseObj)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (e) {
            res.status(500).send(e)
        });
});

app.post('/api/db/find', function (req, res) {
    var model = rq.Post();
    var options = req.body.options;
    var findOne = req.body.findOne;

    console.log("Got find");
    console.log(options);

    return rq.crud_db().find(model, options, findOne)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (e) {
            res.status(500).send(e)
        })
});

app.post('/api/db/update', function (req, res) {
    var model = rq.Post();
    var options = req.body.options;

    console.log("Got update");
    console.log(options);

    return rq.crud_db().update(model, options)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (e) {
            res.status(500).send(e)
        });
});

app.post('/api/db/count', function (req, res) {
    var model = rq.Post();
    var options = req.body.options;

    console.log("Got count");
    console.log(options);

    return rq.crud_db().count(model, options)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (e) {
            res.status(500).send(e)
        });
});

app.post('/api/db/remove', function (req, res) {
    var model = rq.Post();
    var options = req.body.options;

    console.log("Got remove");
    console.log(options);

    return rq.crud_db().remove(model, options)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (e) {
            res.status(500).send(e)
        });
});

server.listen(port, function () {
    console.log("Server listening at port " + port);
});