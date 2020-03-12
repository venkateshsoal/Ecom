const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const mongoose = require('mongoose');
const {User, validate} = require('../modals/users');
const router = express.Router();

router.post('/', async(req,res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('user already registred');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    await user.save();

    //const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));

    res.send({
        id: user.id,
        name: user.name,
        email: user.email
    });
});

module.exports = router;