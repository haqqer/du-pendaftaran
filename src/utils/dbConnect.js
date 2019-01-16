const mongoose = require('mongoose');
if(process.env.NODE_ENV === 'production') {
	require('dotenv').load();
}
// MongoDB connection

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/du-pendaftaran';
mongoose.connect(dbUrl, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true)
mongoose.Promise = global.Promise;
let db = mongoose.connection;

module.exports = db;
