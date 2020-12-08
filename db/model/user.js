// npm modules
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    userImage: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('User', userSchema)