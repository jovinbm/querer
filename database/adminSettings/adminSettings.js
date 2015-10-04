var Promise = require('bluebird');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSettingsSchema = new Schema({
    maintenanceMode: {type: Boolean, unique: false, "default": false, index: true}
});

var AdminSettings = mongoose.model('AdminSettings', adminSettingsSchema);
module.exports = AdminSettings;