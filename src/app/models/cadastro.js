const mongoose = require('../../database');
// const { model } = require('../database');
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    curso: {
        type:String,
        require: true,
    },
    grau: {
        type:String,
        require: true,
    },
    duracao: {
        type:String,
        require: true,
    },
    valor: {
        type:Number,
        require: true,
    },
    descricao: {
        type:String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Cad = mongoose.model('Cad', UserSchema);

module.exports = Cad;