const express = require('express')
const router = express.Router()
const authCheck = require('../middlewares/authCheck')
const ctrl = require('../controllers/users')

router.get('/', authCheck(['admin', 'user']), ctrl.getUserInfo)
router.post('/', ctrl.addUser)
router.patch('/', authCheck(['admin', 'user']), ctrl.changePassword)
router.put('/', authCheck(['admin', 'user']), ctrl.updateUser)
router.delete('/:user_id', authCheck(['admin', 'user']), ctrl.deleteUser)

module.exports = router
