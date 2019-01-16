const express = require('express')
const router = express.Router()
const auth = require('../utils/auth');
const userController = require('../controllers/user.controller');


router.get('/', userController.index);
router.post('/', userController.store);
router.delete('/:id', auth.checkAuth,userController.delete);
// router.put('/:id', userController.update);
// router.get('/:id', userController.show);

module.exports = router;