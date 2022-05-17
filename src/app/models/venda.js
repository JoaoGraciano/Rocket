const mongoose = require('../../database');
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');

const UserSchema = new mongoose.Schema({
    nome: {
        type:String,
        require: true,
    },
    cidade: {
        type:String,
        require: true,
    },
    cpf: {
        type:Number,
        require:true,
    },
    idade: {
        type:String,
        require: true,
    },
    cursos: {
        type: Array,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    valor_total: {
        type:Number,
        require: true,
    },
    valorPago: {
        type:Number,
        require: true
    },
    troco: {
        type: Number,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Venda = mongoose.model('Venda', UserSchema);

module.exports = Venda;