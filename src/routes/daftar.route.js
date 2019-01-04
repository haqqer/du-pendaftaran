const express = require('express');
const router = express.Router();
const multer = require('multer');

const daftarController = require('../controllers/daftar.controller');

let storage = multer.diskStorage({                                                           
    destination: (req, file, cb) => {                                                    
            cb(null, './uploads/')                                                       
    },                                                                                   
    filename: (req, file, cb) => {                                                                                                                                                    
            cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)        
    }                                                                                    
});                                      
let upload = multer({storage: storage}); 

router.get('/', daftarController.index);
router.post('/', upload.single('file_upload'), daftarController.store);

module.exports = router;
