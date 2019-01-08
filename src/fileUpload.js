const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({                                                           
    destination: (req, file, cb) => {                                                    
            cb(null, './src/public/uploads/')                                                       
    },                                                                                   
    filename: (req, file, cb) => {                                                                                                                                                    
            cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)        
    }                                                                                    
});                                      
let upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error({'Error': 'gambar woe'}))
        }
        callback(null, true);
    }
});

module.exports = upload

