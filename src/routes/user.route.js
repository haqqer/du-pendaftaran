const express = require('express')
const router = express.Router()
const auth = require('../auth');
const userController = require('../controllers/user.controller');


router.get('/', auth.checkAuth, userController.index);
router.post('/', auth.checkAuth, userController.store);
router.delete('/:id', auth.checkAuth, userController.delete);
// router.put('/:id', userController.update);
// router.get('/:id', userController.show);

module.exports = router;