// The Fighter model

var mongoose = require('mongoose');

var fighterSchema = new mongoose.Schema({
    "_id": false,
    name: String,
    birth_place: String,
    other_names: String,
    nationality: String,
    weight: String,
    weight_class: String,
    residence: String,
    reach_in: String,
    stance: String,
    wrestling: String,
    style: String,
    fighting_out_of: String,
    team: String,
    fighting_out_of: String,
    years_active: String,
    mma_kowin: String,
    mma_subwin: String,
    mma_decwin: String,
    mma_koloss: String,
    mma_subloss: String,
    mma_decloss: String,
    age: Number,
    country: String,
    co: String,
    fightRecord: Array
});

fighterSchema.index({name: 1}, {unique: true});

module.exports = mongoose.model('fighters', fighterSchema);
