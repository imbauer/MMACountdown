// The EventTime model

var mongoose = require('mongoose');

var eventTimeSchema = new mongoose.Schema({
    "_id": false,
    name: String,
    title: String,
    event: String,
    hour: String,
    minute: String
});

eventTimeSchema.index({name: 1, title: 1}, {unique: true});

module.exports = mongoose.model('eventTimes', eventTimeSchema);
