const Joi = require('joi');
const { join } = require('path');

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    name: Joi.string().required(),
    password: Joi.string().min(8).required()
});

const authCurso = Joi.object({
    curso: Joi.string().required(),
    grau: Joi.string().required(),
    duracao: Joi.string().required(),
    valor: Joi.number().min(3).required(),
    descricao:Joi.string().required(),
})

const authVenda = Joi.object({
    aluno: Joi.object().required(),
    cursos: Joi.array().required(),
    email: Joi.string().email().lowercase().required(),
    valor_total: Joi.number().required(),
    valorPago: Joi.number().required(),
    troco: Joi.number().required(),
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
})

const authLead = Joi.object({
    email: Joi.string().email().lowercase().required(),
    nome: Joi.string().min(3).required(),
    cidade: Joi.string().required(),
    telefone: Joi.number().min(10).required(),
})

module.exports = {
    authSchema, authCurso, authVenda, authAluno
}

