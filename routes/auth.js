const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const mongoose = require('mongoose');
const {User} = require('../modals/users');
const router = express.Router();
const Joi = require('joi');

router.post('/', async(req,res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    //console.log('three',user);
    if(!user) return res.status(400).send('Invalid email and password');
    //console.log('kkkkkkkkk',bcrypt.compare(req.body.password, user.password))

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email and password');

    const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
    res.send(token);
});

function validate(req) {
    //console.log('one',req);
    const schema = {
        email: Joi.string().min(5).max(150).required().email(),
        password: Joi.string().min(5).max(1024).required()
    };
    //console.log('two',Joi.validate(req, schema));
    return Joi.validate(req, schema);
}

module.exports = router;