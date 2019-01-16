const express = require('express');
const app = express();

const daftar = require('./daftar.route');
const user = require('./user.route');
const auth = require('./auth.route');

app.get('/', (req, res) => {
    res.json({'status': 'running'});
});
app.use('/daftar', daftar);
app.use('/user', user);
app.use('/auth', auth);
app.all('*', (req, res) => {
    res.status(404).json({message: 'Not Found'});
});

module.exports = app;