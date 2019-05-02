const User = require('../models/user.model')

// INDEX
exports.index = async (req, res, next) => {
    try {
        const result = await User.find({});
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// SAVE NEW DATA
exports.store = async (req, res, next) => {
    try {
        let document = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        console.log(req.body)
        let user = new User(document)
        const result = await user.save();
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// DELETE
exports.delete = async (req, res, next) => {
    try {
        let result = await User.findOneAndDelete({_id: req.params.id});
        if(!result) {
            return res.json({message: 'Not Found'})
        }
        res.status(200).json({message: "Deleted!"})
    } catch (error) {
        res.status(500).send(error)        
    }
}