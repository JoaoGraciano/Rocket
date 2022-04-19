const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },

    Project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    completed: {
        type: Boolean,
        require: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Task = mongoose.model('Task', ProjectSchema);

module.exports = Task;