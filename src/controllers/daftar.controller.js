const Daftar = require('../models/daftar.model');
const Kelas = require('../models/kelas.model');
const mailer = require('../utils/mailer');

const status = ['Belum Bayar','Tunda','Sudah Bayar']

// GET /daftar : INDEX
exports.index = async (req, res, next) => {
    try {
        const result = await Daftar.find({}, 'nama email kelas status');
        res.json(result);        
    } catch (error) {
        res.status(400).json({message: error});
    }
}

// POST /daftar : SAVE
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
        const result = await Daftar.create(document);
        const kelas = await Kelas.findOneAndUpdate({_id: document.kelas}, {$inc : {jumlah: -1}}, {new: true}).select({nama: 1, _id: 0, jumlah: 1});
        if(result) {    
            console.log('preparation mail send');
            const mailData = {
                email: document.email,
                name: document.nama,
                room: kelas.nama,
                timePlace: kelas.waktuTempat
            }
            // mailer(document.email, "Selamat "+document.nama+" anda telah terdaftar, di acara DU 2019 di kelas "+kelas.nama+" 11 & 18 Mei 2019, di Labolatorium Gedung D, Universitas Dian Nuswantoro, silahkan membayar biaya  pendaftaran 25.0000 melalui transfer rekening MANDIRI 1360016257054 Atas nama maulana muhammadin, atau konfirmasi di Camp Doscom, Gd. D Lt. 1")
            mailer(mailData);
        }
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({message: error.message});
    }
    
}

// DELETE /daftar/:id
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

// GET /daftar/:id : PUT
exports.put = async (req, res, next) => {
    try {
        const result = await Daftar.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})    
        res.status(201).send(result);
    } catch (error) {
        res.status(400).json({message: err.message})
    }
}

// GET /daftar/:id : SHOW
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

// POST /daftar/search : SEARCH by Email
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

// PUT /daftar/upload : SEARCH and UPLOAD by Email
exports.upload = async (req, res, next) => {
    try {
        let file_path = req.file.filename;
        let id_status = 1;
        const result = await Daftar.findOneAndUpdate({email: req.body.email}, {$set: {bukti: file_path, status: id_status}}, {new: true})  
        res.status(201).send(result);
    } catch (error) {
        res.status(400).json({message: err.message});
    }
}

// GET /export : EXPORT Daftar to XLSX (excel)
exports.export = async (req, res, next) => {
    try {
        const data = await Daftar.find().lean().exec({});
        let datatoxls = []
        data.forEach(element => {
            datatoxls.push({
                id: element._id,
                nama: element.nama,
                email: element.email,
                kelas: kelas[element.kelas],
                instansi: element.instansi,
                telp: element.telp,
                id_tele: element.id_tele,
                bukti: req.hostname+'/public/'+element.bukti,
                status: status[element.status],
                createdAt: element.createdAt,
                updatedAt: element.updatedAt
            })
        });
        res.status(200).xls('data.xlsx', datatoxls)
    } catch (error) {
        res.status(400).json({message: 'Unsuccessfull!'})   
    }
}

// DELETE /daftar
exports.removeAll = async (req, res) => {
    try {
        const result = await Daftar.deleteMany({});
        await Kelas.updateMany({}, {jumlah: 25}, {new: true})
        if(!result) {
            res.json({message: "Failed Remove All"})
        } else {
            res.json({message: "All Removed!"});
        }
    } catch (error) {
        res.status(400).json({message: 'Unsuccessfull!'})   
    }
}
