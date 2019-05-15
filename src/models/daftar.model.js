const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DaftarSchema = new Schema({
    nama: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100, unique: true},
    instansi: {type: String, required: true, max: 100},
    kelas: {type: Schema.Types.ObjectId, ref: 'Kelas', required: true},
    telp: {type: String, required: true, max: 15, unique: true},
    id_tele: {type: String, max: 100},
    bukti: {type: String},
    status: {type: Number}
}, {timestamps: true})
DaftarSchema.index({nama: 'text', email: 'text', instansi: 'text', 'kelas.nama' : 'text', telp: 'text', telp: 'text', id_tele: 'text'});
module.exports = mongoose.model('Daftar', DaftarSchema);