const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 150
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 150,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}); 

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(150).required(),
        email: Joi.string().min(5).max(150).required().email(),
        password: Joi.string().min(5).max(1024).required()
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;