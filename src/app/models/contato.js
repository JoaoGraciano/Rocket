const mongoose = require('../../database');
// const { model } = require('../database');
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    email: {
        type:String,
        require: true,
    },
    nome: {
        type:String,
        require: true,
    },
    telefone: {
        type:Number,
        require: true,
    },
    cidade: {
        type:String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Contato = mongoose.model('Contato', UserSchema);

module.exports = Contato;