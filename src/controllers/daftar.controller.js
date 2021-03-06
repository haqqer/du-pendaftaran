const Daftar = require('../models/daftar.model');
const Kelas = require('../models/kelas.model');
const mailer = require('../utils/mailer');

const status = ['Belum Bayar','Tunda','Sudah Bayar']

// GET /daftar : INDEX
exports.index = async (req, res, next) => {
    try {
        //let result = await Daftar.find({}, 'nama email kelas status');
        let result = await Daftar.find({}).populate('kelas', 'nama');
        let data = [];
        result.forEach(element => {
            data.push({
                id: element._id,
                nama: element.nama,
                email: element.email,
                kelas: element.kelas.nama,
                instansi: element.instansi,
                telp: element.telp,
                id_tele: element.id_tele,
                bukti: element.bukti,
                status: status[element.status],
                createdAt: element.createdAt,
                updatedAt: element.updatedAt
            })
        });
            // console.log(result[0].status);
        res.json(data);        
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
	console.log(result);
        const kelas = await Kelas.findOneAndUpdate({_id: document.kelas}, {$inc : {jumlah: -1}}, {new: true}).select({nama: 1, _id: 0, jumlah: 1, waktuTempat: 1});
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
	console.log(error);
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
        const getOne = await Daftar.findById({ _id: req.params.id});
        //console.log(getOne);
        let kelas_before;
        let kelas_after;
        if(req.body.kelas) {
            if(req.body.kelas != getOne.kelas) {
                kelas_before = await Kelas.findOneAndUpdate({_id: getOne.kelas}, {$inc : {jumlah: 1}}, {new: true}).select({nama: 1, _id: 0, jumlah: 1, waktuTempat: 1});
                kelas_after = await Kelas.findOneAndUpdate({_id: req.body.kelas}, {$inc : {jumlah: -1}}, {new: true}).select({nama: 1, _id: 0, jumlah: 1, waktuTempat: 1});
            
                console.log('preparation mail send');
                const mailData = {
                    email: getOne.email,
                    name: getOne.nama,
                    room: kelas_after.nama,
                    timePlace: kelas_after.waktuTempat,
                    status: getOne.status
                }
                // mailer(document.email, "Selamat "+document.nama+" anda telah terdaftar, di acara DU 2019 di kelas "+kelas.nama+" 11 & 18 Mei 2019, di Labolator
                mailer(mailData);
            }
        }
        const result = await Daftar.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true});  
        res.status(201).send(result);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// GET /daftar/:id : SHOW
exports.show = async (req, res, next) => {
    try {
        const result = await Daftar.findById({ _id: req.params.id });
        if (!result) {
            return res.status(404).json({message: 'Not Found'})
        }
        res.send(result)        
    } catch (error) {
        res.status(500).send(error);
    }

}

// POST /daftar/search : SEARCH by Email
exports.search = async (req, res, next) => {
    try {
        console.log(req.query.field);
        console.log(req.query.s);
        // let result = await Daftar.find({ $text: { $search: req.query.s } }).populate('kelas', 'nama');
        let result = await Daftar.find({ "req.query.field": "req.query.s" }).populate('kelas', 'nama');
        let data = [];
        result.forEach(element => {
            data.push({
                id: element._id,
                nama: element.nama,
                email: element.email,
                kelas: element.kelas.nama,
                instansi: element.instansi,
                telp: element.telp,
                id_tele: element.id_tele,
                bukti: element.bukti,
                status: status[element.status],
                createdAt: element.createdAt,
                updatedAt: element.updatedAt
            })
        });
        if(!result) {
            return res.status(404).json({message: "User not found"})
        }
        res.json({count: data.length, result: data});
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
exports.xls = async (req, res) => {
    try {
	// const status = ['Belum Bayar','Tunda','Sudah Bayar'];
        const data = await Daftar.find().populate('kelas', 'nama').lean().exec({});
	//console.log(data);
        let datatoxls = [];
        data.forEach(element => {
            datatoxls.push({
                id: element._id,
                nama: element.nama,
                email: element.email,
                kelas: element.kelas.nama,
                instansi: element.instansi,
                telp: element.telp,
                id_tele: element.id_tele,
                bukti: element.bukti,
                status: status[element.status],
                createdAt: element.createdAt,
                updatedAt: element.updatedAt
            })
        });
	//console.log(datatoxls);
	const timeset = new Date();
        res.xls('data'+timeset.getTime()+'.xlsx', datatoxls)
	//res.status(200).json({message: 'ok'});
    } catch (error) {
        res.status(400).json({message: error})   
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

exports.status = async (req, res) => {
    try {
        let query;
        if(req.query.email && req.query.s) {
            query = { email: req.query.email, status: req.query.s }
        } else if(req.query.email) {
            query = { email: req.query.email }            
        } else {
            query = { status: req.query.s }            
        }
        let result = await Daftar.find(query).populate('kelas', 'nama');
        let data = [];
        result.forEach(element => {
            data.push({
                id: element._id,
                nama: element.nama,
                email: element.email,
                kelas: element.kelas.nama,
                instansi: element.instansi,
                telp: element.telp,
                id_tele: element.id_tele,
                bukti: element.bukti,
                status: status[element.status],
                createdAt: element.createdAt,
                updatedAt: element.updatedAt
            })
        });
        if(!result) {
            return res.status(404).json({message: "User not found"})
        }
        res.json({count: data.length, result: data});
    } catch(error) {
        res.status(400).json({message: error});   
    }
}

exports.send = (req, res, next) => {
    try{
        const getOne = await Daftar.findOne({ email: req.body.email });
        const kelas = await Kelas.findOne({_id: document.kelas}).select({nama: 1, _id: 0, jumlah: 1, waktuTempat: 1});
        if(getOne) {    
            console.log('preparation mail send');
            const mailData = {
                email: getOne.email,
                name: getOne.nama,
                room: kelas.nama,
                timePlace: kelas.waktuTempat
            }
            // mailer(document.email, "Selamat "+document.nama+" anda telah terdaftar, di acara DU 2019 di kelas "+kelas.nama+" 11 & 18 Mei 2019, di Labolatorium Gedung D, Universitas Dian Nuswantoro, silahkan membayar biaya  pendaftaran 25.0000 melalui transfer rekening MANDIRI 1360016257054 Atas nama maulana muhammadin, atau konfirmasi di Camp Doscom, Gd. D Lt. 1")
            mailer(mailData);
        }
        res.status(200).json({message: "Email to "+getOne.email+", has been sent!"});
    } catch(error) {
        res.status(400).json({message: error});
    }
}