var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postCategorySchema = new Schema({
    postCategoryName: {type: String, required: true, index: true},
    postCategoryUniqueCuid: {type: String, required: true, unique: true, index: true},
    postCategoryIndex: {type: Number, default: 0, required: true, unique: true, index: true},
    numberOfAllPosts: {type: Number, default: 0, index: true},
    numberOfNewPosts: {type: Number, default: 0, index: true},
    createdAt: {type: Date, default: Date.now, index: true},
    updatedAt: {type: Date, default: Date.now, index: true},
    lastRetrievedAt: {type: Date, default: Date.now, index: true},
    hotMeter: {type: Number, default: 0, index: true},
    trendingMeter: {type: Number, default: 0, index: true}
});

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
postCategorySchema.plugin(autoIncrement.plugin, {
    model: 'PostCategory',
    field: 'postCategoryIndex',
    startAt: 1
});

var PostCategory = mongoose.model('PostCategory', postCategorySchema);

module.exports = PostCategory;