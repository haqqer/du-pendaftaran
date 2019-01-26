const Kelas = require('../models/kelas.model');

exports.index = async (req, res) => {
    try {
        const result = await Kelas.find({});
        if(result == '') {
            res.json({message: "Is empty"})
        } else {
            res.json(result);
        }
    } catch (error) {
        res.json({message: error});
    }
}

exports.create = async (req, res) => {
    try {
        const document = {
            nama: req.body.nama,
            jumlah: 25
        };
        const result = await Kelas.create(document);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({message: error});
    }
}

exports.show = async (req, res) => {
    try {
        const result = await Kelas.findById({_id: req.params.id});
        res.json(result);
    } catch (error) {
        res.status(400).json({message: error});        
    }
}

exports.update = async (req, res) => {
    try {
        const result = await Kelas.findByOneAndUpdate({_id: req.params.id},{$set: req.body});
        res.status(201).json({message: 'Success'});
    } catch (error) {
        res.status(400).json({message: error});
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await Kelas.findByIdAndRemove({_id: req.params.id});
        res.json({message: 'Success'})
    } catch (error) {
        res.status(400).json({message: error});        
    }
}