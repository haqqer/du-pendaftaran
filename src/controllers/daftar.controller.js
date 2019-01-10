const multer = require('multer');
const Daftar = require('../models/daftar.model');
const path = require('path');

exports.index = async (req, res, next) => {
    try {
        await Daftar.find({}, (err, daftars) => {
            if(err) return next(err);
            res.json(daftars);
        })
    } catch (error) {
        res.sendStatus(500)
        next(error)
    }

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
    try {
        await daftar.save((err) => {
            if(err) {
                res.status(400).json(err)
            } else {
                res.status(201).send(daftar)
            }  
        }); 
    } catch (error) {
        
    }

    
}

exports.delete = async (req, res, next) => {
    try {
        await Daftar.deleteOne({ _id: req.params.id}, (err, result) => {
            if (err) {
                res.status(400).send(err);
                next(err)
            }
            res.json(result);
        })
    } catch (error) {
        res.sendStatus(500)
        next(error)
    }
}
// exports.put = (req, res, next) {
//     Daftar.findById({

//     }) 
// }


exports.show = async (req, res, next) => {
    try{
        await Daftar.findById({ _id: req.params.id }, (err, result) => {
            if (err) return res.sendStatus(500);
            res.json(result)
        })
    } catch(e) {
        res.sendStatus(500)
        next(error)
    }
}
