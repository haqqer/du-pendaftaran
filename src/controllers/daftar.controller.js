const Daftar = require('../models/daftar.model');

exports.index = async (req, res, next) => {
    await Daftar.find({}, (err, daftars) => {
        if(err) return res.status(404).send(err);
        res.json(daftars);
    })
}

exports.store = async (req, res, next) => {
    try {
        if(!req.file) {
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
        const result = await daftar.save();
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
    } catch (error) {
        res.status(500).send(error)
    }

}

// PUT
exports.put = async (req, res, next) => {
    try {
        const result = await Daftar.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})    
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
