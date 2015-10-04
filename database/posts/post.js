var Promise = require('bluebird');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    postUniqueCuid: {type: String, required: true, unique: true, index: true},
    postIndex: {type: Number, default: 0, required: true, unique: true, index: true},
    postCategoryUniqueCuid: {type: String, required: true, unique: false, index: true},
    postType: {type: String, required: true, unique: false, index: true},
    authorUniqueCuid: {type: String, required: true, unique: false, index: true},
    //***********
    authorName: {type: String, required: true, unique: false, index: true}, //these are kept here since some posts involve external users that don't have accounts, hence there names will
    //be included here. Prepareposts in postsfn in post fn replaces these automatically IN THE RETRIEVED POSTS if the author changes the name or username;
    authorUsername: {type: String, required: true, unique: false, index: true},
    //************
    postHeading: {type: String, required: true, index: true},
    postShortHeading: {type: String, required: true, index: true},
    postHeaderImageKey: {type: String, required: true, index: true},
    postContent: {type: String, required: true},
    postSummary: {type: String, required: true},
    postTags: {type: Array, default: [], index: true, unique: false},
    postUploads: {type: Array, default: [], index: true, unique: false},
    numberOfVisits: {type: Number, default: 0, index: true},
    numberOfVisitsArray: {type: Schema.Types.Mixed, default: [], index: true, unique: false},
    isTrashed: {type: Boolean, default: false, index: true},
    createdAt: {type: Date, default: Date.now, index: true},
    updatedAt: {type: Date, default: Date.now, index: true},
    lastRetrievedAt: {type: Date, default: Date.now, index: true},
    hotMeter: {type: Number, default: 0, index: true},
    trendingMeter: {type: Number, default: 0, index: true}
});

var textSearch = require('mongoose-text-search');
postSchema.plugin(textSearch);

postSchema.index({
    authorName: "text",
    postHeading: "text",
    postShortHeading: "text",
    postSummary: "text",
    postContent: "text",
    postTags: "text",
    postUploads: "text"
});

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
postSchema.plugin(autoIncrement.plugin, {
    model: 'Post',
    field: 'postIndex',
    startAt: 1
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;