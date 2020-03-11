const express = require('express');
const Joi = require('joi');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const auth = require('./routes/auth');


const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/eEcom')
    .then(() => console.log('connected to DB...'))
    .catch(err => console.error('could not connect to mongodb--'));

const courses = [
    { id:1, name: 'course1'},
    { id:2, name: 'course2'},
    { id:3, name: 'course3'},
];

app.get('/', (req, res) => res.send('Hello World! hiiii everyone'))

app.get('/api/courses', (req, res) => {
    res.send([1,2,3]);
});

app.get('/api/courses/:id', (req, res) => {
    const course  = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
        res.status(404).send('not found');
    res.send(course);
});

app.use(bodyParser.json());
app.use('/api/users', users);
app.use('/api/auth', auth); 

app.listen(port, () => console.log(`Example app listening on port ${port}!`))