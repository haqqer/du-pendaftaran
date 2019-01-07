const multer = require('multer');
const Daftar = require('../models/daftar.model');

exports.index = (req, res, next) => {
    Daftar.find({}, (err, daftars) => {
        if(err) return next(err);
        res.json(daftars);
    })
}

exports.store = (req, res, next) => {
    let path = req.file.filename;
    if(path==null) {
        path = 0;
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
    daftar.save((err) => {
      if(err) {
          res.status(400).json({"Error": "Duplicate"})
      } else {
        res.status(201).send(daftar)
      }  
    });
    
}

exports.delete = (req, res, next) => {
    Daftar.deleteOne({
        _id: req.params.id
    }, (err) => {
        if(err) {
            return res.send({'Error': 'Failed Delete'})
        }
        res.json({'message': 'Successfully deleted'});
        next();
    })
}
