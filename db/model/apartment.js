const mongoose = require('mongoose');

// user
const User = require('./user')

const apartmentSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    author: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    address: { type: String, required: true },
    NumOfRooms: { type: Number, required: true },
    // apartment_img: { type: String },
    created_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Apartment', apartmentSchema)