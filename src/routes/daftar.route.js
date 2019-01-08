const express = require('express');
const router = express.Router();
const fileUpload = require('../fileUpload');

// const multer = require('multer');
// const path = require('path');

const daftarController = require('../controllers/daftar.controller');

// let storage = multer.diskStorage({                                                           
//     destination: (req, file, cb) => {                                                    
//             cb(null, './uploads')                                                       
//     },                                                                                   
//     filename: (req, file, cb) => {                                                                                                                                                    
//             cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)        
//     }                                                                                    
// });                                      
// let upload = multer({
//     storage: storage,
//     fileFilter: (req, file, callback) => {
//         let ext = path.extname(file.originalname);
//         if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
//             return callback(new Error({'Error': 'gambar woe'}))
//         }
//         callback(null, true);
//     }
// }); 

router.get('/', daftarController.index);
router.post('/', fileUpload.single('file_upload'), daftarController.store);
router.delete('/:id', daftarController.delete);
module.exports = router;
