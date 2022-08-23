const express = require('express')
const router = express.Router()
const authCheck = require('../middlewares/authCheck')
const ctrl = require('../controllers/users')

router.get('/', authCheck, ctrl.getUserInfo)
router.post('/', ctrl.addUser)
router.patch('/', authCheck, ctrl.changePassword)
router.put('/', authCheck, ctrl.updateUser)
router.delete('/:user_id', authCheck, ctrl.deleteUser)

module.exports = router
