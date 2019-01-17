const mongoose = require('mongoose');
const config = require('../../config.json');
console.log(config['development'].database)
const defaultConfig = config.development;
let environment;
if(process.env.NODE_ENV === 'production') {
	environment = config[process.env.NODE_ENV].database;
}
// MongoDB connection

const dbUrl = environment || defaultConfig.database;
console.log(environment);
mongoose.connect(dbUrl, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true)
mongoose.Promise = global.Promise;
let db = mongoose.connection;

module.exports = db;
