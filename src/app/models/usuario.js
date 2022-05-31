const mongoose = require('../../database');
// const { model } = require('../database');
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    login: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Usua = mongoose.model('Usua', UserSchema);

module.exports = Usua;