const Joi = require('joi');
const { join } = require('path');

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    name: Joi.string().required(),
    password: Joi.string().min(8).max(999).required(),
    _id: Joi.string().allow(null),
});

const authCurso = Joi.object({
    curso: Joi.string().required(),
    grau: Joi.string().required(),
    duracao: Joi.string().required(),
    valor: Joi.number().min(3).required(),
    descricao:Joi.string().required(),
    _id: Joi.string(),
})

const authVenda = Joi.object({
    aluno: Joi.object().required(),
    cursos: Joi.array().required(),
    valor_total: Joi.number().required(),
    valorPago: Joi.number().required(),
    troco: Joi.number().required(),
    _id: Joi.string().allow(null),
})

const authAluno = Joi.object({
    nome: Joi.string().min(3).required(),
    idade: Joi.number().required(),
    cpf: Joi.number().min(11).required(),
    endereco: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    cidade: Joi.string().required(),
    estado: Joi.string().required(),
    cep: Joi.string().min(8).required(),
    telefone: Joi.number().min(10).required(),
    _id: Joi.string().allow(null),
})

const authLead = Joi.object({
    email: Joi.string().email().lowercase().required(),
    nome: Joi.string().min(3).required(),
    cidade: Joi.string().required(),
    telefone: Joi.number().min(10).required(),
    _id: Joi.string().allow(null),

})

module.exports = {
    authSchema, authCurso, authVenda, authAluno, authLead
}

