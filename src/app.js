const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// configuration
if(process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}
const app = express();
app.use(cors());
app.use('/uploads', express.static('uploads'));
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/doscomdu';

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


app.listen(port, () => {
    console.log('App is running on port '+port);
})
