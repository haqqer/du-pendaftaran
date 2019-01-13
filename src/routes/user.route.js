const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

router.get('/', userController.index)
router.post('/', userController.store)
router.delete('/:id', userController.delete)

module.exports = router