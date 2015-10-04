var Promise = require('bluebird');
var path = require('path');

module.exports = {

    database: function () {
        return require('./database/database.js');
    },

    permissions: function () {
        return require('./database/database.js').permissions;
    },

    PostCategory: function () {
        return require('./database/database.js').PostCategory;
    },

    Post: function () {
        return require('./database/database.js').Post;
    },

    User: function () {
        return require('./database/database.js').User;
    },

    Query: function Query(findQuery, updateQuery, returnQuery, lean, sort, limit, skip) {
        this.findQuery = findQuery || {};
        this.updateQuery = updateQuery || {};
        this.returnQuery = returnQuery || null;
        this.lean = lean || null;
        this.sort = sort || null;
        this.limit = limit || null;
        this.skip = skip || null;
    },

    plugins: function () {
        return require('./database/database.js').plugins;
    },

    crud_db: function () {
        return require('./db/db.js').crud_db;
    }
};