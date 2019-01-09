const mongoose = require('mongoose');
if(process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}
// MongoDB connection

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/doscomdu';
mongoose.connect(dbUrl, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true)
mongoose.Promise = global.Promise;
let db = mongoose.connection;

module.exports = db;

// db.on('error', console.error.bind(console, 'MongoDB Connection error'));