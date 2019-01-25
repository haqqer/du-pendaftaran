const express = require('express');
const router = express.Router();
const kelasController = require('../controllers/kelas.controller');
const auth = require('../utils/auth');

router.get('/', kelasController.index);
router.post('/', kelasController.create);
router.get('/:id', kelasController.show);
router.put('/:id', kelasController.update);
router.delete('/:id', kelasController.delete);

module.exports = router;