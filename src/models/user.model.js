const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')


let UserSchema = new Schema({
    name: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100, unique: true},
    password: {type: String, required: true, max: 100}
}, {timestamps: true})


UserSchema.pre('save', function(next) {
    let user = this
    bcrypt.genSalt(10, (err, salt) => {
        if (err) console.log(err)
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next()
        })
    })
        
})

module.exports = mongoose.model('User', UserSchema);
