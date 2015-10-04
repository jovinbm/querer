var fileName = 'crud.js';

var Promise = require('bluebird');
var rq = require('../rq.js');


module.exports = {

    save: function (mongooseObj) {
        var module = 'save';
        return mongooseObj.saveAsync()
            .catch(function (err) {
                throw {
                    err: new Error(err),
                    code: 500
                };
            })
            .spread(function (obj) {
                return obj;
            });
    },

    find: function (model, options, findOne) {
        var module = 'find';

        var findQuery = options.findQuery || {};
        var returnQuery = options.returnQuery || null;

        var p;
        if (findOne) {
            p = model.findOne(findQuery, returnQuery); //returns an object directly, null for not found
        } else {
            p = model.find(findQuery, returnQuery);  //returns an array, [] for not found
        }

        p = options.sort ? p.sort(options.sort) : p;
        p = options.skip ? p.skip(options.skip) : p;
        p = options.limit ? p.limit(options.limit) : p;
        p = options.lean ? p.lean() : p;

        return p.execAsync()
            .catch(function (err) {
                throw {
                    err: new Error(err),
                    code: 500
                };
            })
            .then(function (arr) {
                return arr;
            });
    },

    update: function (model, options) {
        var module = 'update';

        var findQuery = options.findQuery || {};
        var updateQuery = options.updateQuery || {};

        return model.update(findQuery, updateQuery, {
            upsert: false,
            multi: true
        }).execAsync()
            .catch(function (err) {
                throw {
                    err: new Error(err),
                    code: 500
                };
            });
    },

    count: function (model, options) {
        var module = 'count';

        var findQuery = options.findQuery || {};

        return model.count(findQuery)
            .execAsync()
            .catch(function (err) {
                throw {
                    err: new Error(err),
                    code: 500
                };
            })
            .then(function (total) {
                return total;
            });
    },

    remove: function (model, options) {
        var module = 'remove';

        var findQuery = options.findQuery || {};

        return model.remove(findQuery)
            .execAsync()
            .catch(function (err) {
                throw {
                    err: new Error(err),
                    code: 500
                };
            })
            .then(function () {
                return true;
            });
    }
};