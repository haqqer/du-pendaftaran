const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KelasSchema = new Schema({
    nama: {type: String, required: true},
    waktuTempat: {type: Array},
    jumlah: {type: Number}
},{timestamps: true});

module.exports = mongoose.model('Kelas', KelasSchema);