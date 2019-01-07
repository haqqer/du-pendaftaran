const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// configuration
const app = express();
const port = process.env.PORT || 3000;
const host = '0.0.0.0';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const dbUrl = 'mongodb://localhost:27017/doscomdu';

// MongoDB connection
mongoose.connect(dbUrl, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true)
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection error'));

const daftar = require('./routes/daftar.route');

app.get('/', (req, res) => {
    res.json({'status': 'ok'});
})

app.use('/daftar', daftar);


app.listen(port, host)
() => {
    console.log('App is running on port '+port);
})
