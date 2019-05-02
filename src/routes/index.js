const express = require('express');
const app = express();

const daftar = require('./daftar.route');
const user = require('./user.route');
const kelas = require('./kelas.route');
const auth = require('./auth.route');

app.get('/', (req, res) => {
    res.json({'status': 'running'});
});
app.use('/daftar', daftar);
app.use('/user', user);
app.use('/kelas', kelas);
app.use('/auth', auth);
app.all('*', (req, res) => {
    res.status(404).json({message: 'Not Found'});
});

module.exports = app;