const express = require('express');
const router = express.Router();
const fileUpload = require('../fileUpload');

const daftarController = require('../controllers/daftar.controller');

router.get('/', daftarController.index);
router.post('/', fileUpload.single('file_upload'), daftarController.store);
router.delete('/:id', daftarController.delete);
router.put('/:id', daftarController.put);
router.get('/:id', daftarController.show);
module.exports = router;
