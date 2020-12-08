var mongoose = require('mongoose');

// files
const Review = require('./reviews')

var imageSchema = new mongoose.Schema({
    review_id: { type: mongoose.Schema.Types.ObjectId, ref: Review, required: true },
    url: { type: String }
});

module.exports = mongoose.model('Video', imageSchema)