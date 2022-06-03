const mongoose = require('../../database');
// const { model } = require('../database');
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    nome: {
        type:String,
        require: true,
    },
    idade: {
        type: Number,
        require: true,
    },
    cpf: {
        type: Number,
        require: true,
    },
    endereco: {
        type: String,
        require: true,
    },
    email: {
        type:String,
        require: true,
    },
    cidade: {
        type:String,
        require: true,
    },
    estado: {
        type: String,
        require,
    },
    cep: {
        type: String,
        require: true,
    },
    telefone: {
        type:Number,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Alunos = mongoose.model('alunos', UserSchema);

module.exports = Alunos;