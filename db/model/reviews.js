const mongoose = require('mongoose');

// user
const User = require('./user')
const Apartment = require('./apartment')

const reviewSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: User },
    apartment_id: { type: mongoose.Schema.Types.ObjectId, ref: Apartment, required: true },
    review: { type: String },
    // review_img: { type: String },
    // review_video: { type: String },
    upvote: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Reviews', reviewSchema)