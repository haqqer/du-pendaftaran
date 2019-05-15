const express = require('express');
const router = express.Router();
const fileUpload = require('../utils/fileUpload');
const daftarController = require('../controllers/daftar.controller');
const auth = require('../utils/auth');

router.get('/', auth.checkAuth, daftarController.index);
router.post('/', fileUpload.single('file_upload'), daftarController.store);
router.put('/:id',  fileUpload.single('file_upload'), daftarController.put);
router.delete('/', auth.checkAuth, daftarController.removeAll);
router.delete('/:id', auth.checkAuth, daftarController.delete);
router.get('/search', daftarController.search);
router.get('/status', daftarController.status);
router.post('/upload', fileUpload.single('file_upload'), daftarController.upload);
router.get('/xls',  daftarController.xls);
router.get('/:id', auth.checkAuth, daftarController.show);


module.exports = router;
