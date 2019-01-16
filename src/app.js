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
} else {
    const logger = require('morgan');
    app.use(logger('dev'));
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
const routes = require('./routes');

app.use(passport.initialize());
app.use(passport.session());

// DB Connection
let db = require('./utils/dbConnect');
db.on('error', console.error.bind(console, 'MongoDB Connection error'));

// Express Static
app.use('/public', express.static('./src/public/uploads'));
app.use('/api', routes);


app.listen(port, host, () => {
    console.log('App is running on port '+port);
})
