const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash');
require('./utils/auth').login(passport)

// configuration
if(process.env.NODE_ENV === 'production') {
	require('dotenv').load();
}

const app = express();
app.use(cors());
app.use(flash());

const port = process.env.PORT || 3000;
const host = '0.0.0.0';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())
app.use(session({
    secret: 'dulhur',
    saveUninitialized: true,
    resave: true
}));
// Routers
const daftar = require('./routes/daftar.route');
const user = require('./routes/user.route');
const auth = require('./routes/auth.route');

app.use(passport.initialize());
app.use(passport.session());

// DB Connection
let db = require('./utils/dbConnect');
db.on('error', console.error.bind(console, 'MongoDB Connection error'));

// Express Static
app.use('/public', express.static('./src/public/uploads'));

app.get('/', (req, res) => {
    res.json({'status': 'running'});
})

app.use('/daftar', daftar);
app.use('/user', user);
app.use('/auth', auth);
app.all('*', (req, res) => {
    res.status(404).json({message: 'Not Found'});
})

app.listen(port, host, () => {
    console.log('App is running on port '+port);
})
