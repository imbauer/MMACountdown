// The Event model

var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    "_id": false,
    name: String,
    title: String,
    event: String,
    otherName: String,
    promotion: String,
    nextEvent: String,
    location: {
        name: String,
        city: String,
        provState: String,
        country: String,
        co: String
    },
    when: {
        offset: String,
        year: String,
        month: String,
        monthString: String,
        day: String,
        weekDay: String,
        hour: String,
        minute: String
    },
    fightCard: Array
});

eventSchema.index({name: 1, title: 1, event: 1}, {unique: true});

module.exports = mongoose.model('events', eventSchema);
