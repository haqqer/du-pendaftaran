const express = require('express');
const router = express.Router();
const fileUpload = require('../utils/fileUpload');
const daftarController = require('../controllers/daftar.controller');
const auth = require('../utils/auth');

router.get('/', auth.checkAuth, daftarController.index);
router.post('/', fileUpload.single('file_upload'), daftarController.store);
router.delete('/:id', auth.checkAuth, daftarController.delete);
router.put('/:id',  fileUpload.single('file_upload'), daftarController.put);
router.post('/search', daftarController.search);
router.get('/export',  auth.checkAuth, daftarController.export);
router.get('/:id', auth.checkAuth, daftarController.show);


module.exports = router;
