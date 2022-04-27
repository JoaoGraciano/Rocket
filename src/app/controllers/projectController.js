const express = require('express');
const { use } = require('../../modules/mailer');

const authMiddleware = require('../middlewares/auth');

const Project = require('../models/project');
const Task = require('../models/task');
const Cad = require('../models/cadastro');

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
        const { title, descripton, tasks } = req.body;

        const project = await Project.findByIdAndUpdate(req.params.projectId, {
            title, descripton}, {new: true});

            project.tasks = [];
            await Task.remove({project:project._id});

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

router.delete('/:projectId', async (req, res) => {
    try {
        const projects = await Project.findByIdAndRemove(req.params.projectId).populate('user');

        return res.send({projects});
    } catch (err) {
        return res.status(400).send({error: 'Error loading project'});
    }
});

module.exports = app => app.use('/projects', router); 