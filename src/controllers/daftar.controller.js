const Daftar = require('../models/daftar.model');
// const mailer = require('../utils/mailer');
const fs = require('fs');

exports.index = async (req, res, next) => {
    await Daftar.find({}, 'nama email kelas',(err, daftars) => {
        if(err) return res.status(404).send(err);
        res.json(daftars);
    })
}

exports.store = async (req, res, next) => {
    try {
        let id_status;
        if(!req.file) {
            file_path = 0;
            id_status = 0;
        } else {
            file_path = req.file.filename;
            id_status = 1;
        } 
        let document = {                                                                     
            nama: req.body.nama,                                                         
            email: req.body.email,   
            kelas: req.body.kelas,                                                       
            instansi: req.body.instansi,                                                         
            telp: req.body.telp,                                                         
            id_tele: req.body.id_tele,                                                         
            bukti: file_path,
            status: id_status
        };     
        let daftar = new Daftar(document);
        const result = await daftar.save();
        // if(result) {
        //     mailer(document.email, "Selamat anda terdaftar di acara DU 2019 di kelas "+document.kelas)
        // }
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({message: error.message});
    }
    
}

// DELETE
exports.delete = async (req, res, next) => {
    try {
        const result = await Daftar.findOneAndDelete({ _id: req.params.id})
        if(!result) {
            return res.json({message: 'Not Found'})
        }
        res.json({message: "Success Deleted"})
    } catch (error) {
        res.status(500).send(error)
    }

}

// PUT
exports.put = async (req, res, next) => {
    try {
        let id_status;
        if(!req.file) {
            file_path = 0;
            id_status = 0;
        } else {
            file_path = req.file.filename;
            id_status = 1;
        } 
        // let document = {                                                                     
        //     nama: req.body.nama,                                                         
        //     email: req.body.email,   
        //     kelas: req.body.kelas,                                                       
        //     instansi: req.body.instansi,                                                         
        //     telp: req.body.telp,                                                         
        //     id_tele: req.body.id_tele,                                                         
        //     bukti: file_path,
        //     status: id_status,
        //     created_at: Date.now(),
        //     updated_at: Date.now()
        // };
        const result = await Daftar.findOneAndUpdate(
            {_id: req.params.id}, 
            {$set: {
                nama: req.body.nama || '',                                                         
                email: req.body.email || '',   
                kelas: req.body.kelas || '',                                                       
                instansi: req.body.instansi || '',                                                         
                telp: req.body.telp || '',                                                         
                id_tele: req.body.id_tele || '',                                                         
                bukti: file_path || '',
                status: id_status,
            }}, 
            {new: true})    
        res.status(201).send(result);
    } catch (error) {
        res.status(400).json({message: err.message})
    }
}

// SHOW
exports.show = async (req, res, next) => {
    try {
        const result = await Daftar.findById({ _id: req.params.id})
        if (!result) {
            return res.json({message: 'Not Found'})
        }
        res.send(result)        
    } catch (error) {
        res.status(500).send(error);
    }

}

exports.search = async (req, res, next) => {
    try {
        const result = await Daftar.findOne({email: req.body.email})
        if(!result) {
            return res.status(404).json({message: "User not found"})
        }
        res.json(result);
    } catch (error) {
        res.status(400).json({message: error})
    }
}