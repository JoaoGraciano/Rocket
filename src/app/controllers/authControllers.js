const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');


const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const path = require('path');


const authConfig = require('../../config/auth');

const User = require('../models/user');
const jsonwebtoken = require('jsonwebtoken');
const { findOneAndUpdate } = require('../models/user');
const { transporter } = require('../../modules/mailer');
const transport = require('../../modules/mailer');

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

router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;

    try{
        const user = await User.findOne({ email });
        
        if (!user)
            return res.status(400).send({error: 'User not found'});
        
        const token = crypto.randomBytes(20).toString('hex');
        console.log(token);

        // const now = new Date();
        // now.setHours(now.getHours()+1);
 
        // await User.findByIdAndUpdate(user.id, {
        //     '$set': {
        //         passwordResetToken: token,
        //         passwordResetExpires: now,
        //     }
        // });


        const now = new Date(); 
      now.setHours(now.getHours() + 1);


      await User.updateOne({_id: user.id,},
        { 
          passwordResetToken: token,
          passwordResetExpires: now,
      });

        mailer.sendMail({
            to: email,
            from: 'joao.oliveira@grupoprominas.com.br',
            template: 'auth/forgotpassword',
            context: {token},
            
        }, (err) => { console.log(err);
            return res.status(400).send({error: 'Cannot send forgot password email'});
        })
    }   catch (err) {
        res.status(400).send({ error: 'Erro on forgot password, try again'});
    }
});

router.post('/reset_password', async (req, res) => {
    const { email, token, password } = req.body;
    try {
        const user = await User.findOne({email})
            .select('+passwordResetTOken passwordResetEpies');
        if (!user)
            return res.status(400).send({error: 'User not found'});

        if (token !== user.passwordResetToken)
            return res.status(400).send({error: 'Token invalid'});
        
        const now = new Date();

        if (now > user.passwordResetExpires)
            return res.status(400).send({ error: 'Token expired, generate a new one'});

        user.password = password;

        await user.save();

        res.send();

    } catch (err) {
        res.status(400).send({error: 'Cannor reser password, try again'});
    };
})

module.exports = app => app.use('/auth', router);