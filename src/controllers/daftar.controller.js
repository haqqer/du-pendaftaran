const multer = require('multer');
const Daftar = require('../models/daftar.model');

exports.index = (req, res) => {
    Daftar.find({}, (err, daftars) => {
        res.json(daftars)
    })
}

exports.store = (req, res) => {
    let path = 0;
    if(path==null) {
        path = req.file.filename;
    }
    let id_status;
    if(req.body.status == null) {
        id_status= 0;
    }
    let document = {                                                                     
        nama: req.body.nama,                                                         
        email: req.body.email,   
        kelas: req.body.kelas,                                                       
        instansi: req.body.instansi,                                                         
        telp: req.body.telp,                                                         
        id_tele: req.body.id_tele,                                                         
        bukti: path,
        status: id_status,
        created_at: Date.now(),
        updated_at: Date.now()
    }; 
    let daftar = new Daftar(document);
    daftar.save();
    res.status(201).send(daftar)
}

export

