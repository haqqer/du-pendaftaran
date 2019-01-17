const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

const port = process.env.PORT || 3000;
const host = '0.0.0.0';

require('./utils/auth').login(passport)
const app = express();
// configuration
if(process.env.NODE_ENV === 'production') {
	require('dotenv').load();
} else {
    const logger = require('morgan');
    app.use(logger('dev'));
}

app.use(cors());
app.use(flash());

// DB Connection
let db = require('./utils/dbConnect');
db.on('error', console.error.bind(console, 'MongoDB Connection error'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('dulhur'))
app.use(session({
    secret: 'dulhur',
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
        mongooseConnection: db
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));
// app.use(cookieSession({
//     name: "Dulur",
//     keys: "JustDulhur",
//     maxAge: 24 * 60 * 60 * 1000
// }));
// Routers
const routes = require('./routes');

app.use(passport.initialize());
app.use(passport.session());



// Express Static
app.use('/public', express.static('./src/public/uploads'));
app.use('/api', routes);


app.listen(port, host, () => {
    console.log('App is running on port '+port);
})
