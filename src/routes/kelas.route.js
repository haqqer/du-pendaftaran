const express = require('express');
const router = express.Router();
const kelasController = require('../controllers/kelas.controller');
const auth = require('../utils/auth');

router.get('/', kelasController.index);
router.post('/', auth.checkAuth, kelasController.create);
router.get('/:id', auth.checkAuth, kelasController.show);
router.put('/:id', auth.checkAuth, kelasController.update);
router.delete('/:id', auth.checkAuth, kelasController.delete);

module.exports = router;