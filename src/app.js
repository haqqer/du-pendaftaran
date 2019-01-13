const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

// configuration
if(process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}
const app = express();
app.use(cors());

const port = process.env.PORT || 3000;
const host = '0.0.0.0';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// DB Connection
let db = require('./dbConnect');
db.on('error', console.error.bind(console, 'MongoDB Connection error'));

// Routers
const daftar = require('./routes/daftar.route');
const user = require('./routes/user.route');

app.get('/', (req, res) => {
    res.json({'status': 'running'});
})

app.use('/public', express.static('./src/public/uploads'));

app.use('/daftar', daftar);
app.use('/user', user);


app.listen(port, host, () => {
    console.log('App is running on port '+port);
})
