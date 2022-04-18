const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const User = require('../models/user');
const jsonwebtoken = require('jsonwebtoken');

const router = express.Router();

function geneateToken(params = {}) {
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    let { name,email, password } = req.body;
    try{

        if( await User.findOne({ email }))
            return res.status(400).send({error: 'User already exist'});

            const hash = await bcrypt.hash(password, 10);
            password = hash;

        const user = await User.create({name, email, password});
        console.log(user)

        user.password = undefined;

        return res.json({ user });
    } catch (err) {
        return res.status(400).send({error: err});
    }
})

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if(!user)
     return res.status(400).send({ error: 'User nor found' });
    
    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid Password' });
    
        user.password = undefined;

        

    return res.send({ user, token: geneateToken({id: user.id}), });
});

module.exports = app => app.use('/auth', router);