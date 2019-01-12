const multer = require('multer');
const Daftar = require('../models/daftar.model');
const path = require('path');

exports.index = async (req, res, next) => {
    await Daftar.find({}, (err, daftars) => {
        if(err) return res.status(404).send(err);
        res.json(daftars);
    })
}

exports.store = async (req, res, next) => {
    if(!(req.file.filename)) {
        file_path = 0;
    } else {
        file_path = req.file.filename;
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
        bukti: file_path,
        status: id_status,
        created_at: Date.now(),
        updated_at: Date.now()
    }; 
    let daftar = new Daftar(document);
    await daftar.save((err) => {
        if(err) {
            return res.status(400).json({message: err.message})
        }   
        res.status(201).send(daftar)
    }); 
}

exports.delete = async (req, res, next) => {
    await Daftar.deleteOne({ _id: req.params.id}, (err, result) => {
        if (err) {
            return res.status(400).send(err);
        }
        if (result == null) {
            res.json({message: 'Not Found'})
        }
        res.status(200).json({message: "Deleted!"});
    })
}
exports.put = (req, res, next) => {
    Daftar.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}, (err, result) => {
        if(err) {
            return res.status(400).json({message: err.message})
        }
        res.status(201).send(result);
    })
}


exports.show = async (req, res, next) => {
    await Daftar.findById({ _id: req.params.id}, (err, result) => {
        if (err) {
            return res.status(500).send({message: 'Error'})
        }
        if (result == null) {
            return res.json({message: 'Not Found'})
        }
        res.send(result)
    })
}
