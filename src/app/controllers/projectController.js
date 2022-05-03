const express = require('express');
const { use } = require('../../modules/mailer');

const authMiddleware = require('../middlewares/auth');

const Project = require('../models/project');
const Task = require('../models/task');
const Cad = require('../models/cadastro');
const Venda = require('../models/venda');
const User = require('../models/user');
const Contato = require('../models/contato');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const projects = await Cad.find()

        return res.send({projects});
    } catch (err) {
        return res.status(400).send({error: 'Error loading project'});
    }
});

router.get('/user', async (req, res) => {
    try {
        const projects = await User.find()

        return res.send({projects});
    } catch (err) {
        return res.status(400).send({error: 'Error loading project'});
    }
});

router.get('/venda', async (req, res) => {
  
    try {
        const projects = await Venda.find().populate(['user'])

        return res.send({projects});
    } catch (err) {
        return res.status(400).send({error: 'Error loading project'});
    }
});

router.get('/contato', async (req, res) => {
  
    try {
        const projects = await Contato.find()

        return res.send({projects});
    } catch (err) {
        return res.status(400).send({error: 'Error loading project'});
    }
});

router.get('/:projectId', async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate('user');

        return res.send({project});
    } catch (err) {
        return res.status(400).send({error: 'Error loading project'});
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, descripton, tasks } = req.body;

        const project = await Project.create({title, descripton, user: req.userId});

        await Promise.all (tasks.map(async task => {
            const projectTask = new Task({... task, project: project._id});

            await projectTask.save();

            project.tasks.push(projectTask);
        }));

        await project.save();

        return res.send({project});
    } catch (err) {
        console.log(err);
        return res.status(400).send({error: 'Error creating new project'});
    }
});

router.put('/:projectId', async (req, res) => {
    try {
        const { nome, cpf, cidade, idade, curso, valor } = req.body;

        const project = await Venda.findByIdAndUpdate(req.params.projectId, {
            title, descripton}, {new: true});

            project.tasks = [];
            await Venda.remove({project:project._id});

        await Promise.all (tasks.map(async task => {
            const projectTask = new Venda({... nome, cpf, cidade, idade, curso, valor: project._id});

            await projectTask.save();

            project.tasks.push(projectTask);
        }));

        await project.save();

        return res.send({project});
    } catch (err) {
        console.log("erro aqui")
        console.log(err);
        return res.status(400).send({error: 'Error creating new project'});
    }
});

router.put('/update', async (req, res) => {
    try {
        const { curso, grau, duracao, valor, descricao } = req.body;

        const project = await Cad.findByIdAndUpdate(req.params.projectId, {
            curso, grau, duracao, valor, descricao}, {new: true});

            project.tasks = [];
            await Cad.remove({project:project._id});

        await Promise.all (tasks.map(async task => {
            const projectTask = new Cad({... curso, grau, duracao, valor, descricao: project._id});

            await projectTask.save();

            project.tasks.push(projectTask);
        }));

        await project.save();

        return res.send({project});
    } catch (err) {
        console.log(err);
        console.log("erro aqui2")
        return res.status(400).send({error: 'Error creating new project'});
    }
});


router.delete('/:projectId', async (req, res) => {
    try {
        await Cad.findByIdAndRemove(req.params.projectId)
        console.log(req.params.projectId)
      return res.status(200).json()
    } catch (error) {
      return res.status(400).json({ error: 'Error loading project' })
    }
  })

  router.delete('/:projectId', async (req, res) => {
    try {
        await Venda.findByIdAndRemove(req.params.projectId)
        console.log(req.params.projectId)
      return res.status(200).json()
    } catch (error) {
      return res.status(400).json({ error: 'Error loading project' })
    }
  })
module.exports = app => app.use('/projects', router); 