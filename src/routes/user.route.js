const express = require('express')
const router = express.Router()
const auth = require('../auth');
const userController = require('../controllers/user.controller');


router.get('/', userController.index);
router.post('/', userController.store);
router.delete('/:id', userController.delete);
// router.put('/:id', userController.update);
// router.get('/:id', userController.show);

module.exports = router;