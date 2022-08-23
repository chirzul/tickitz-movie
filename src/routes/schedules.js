const express = require('express')
const router = express.Router()
const authCheck = require('../middlewares/authCheck')
const ctrl = require('../controllers/schedules')

router.get('/:schedule_id', authCheck(['admin', 'user']), ctrl.getScheduleById)
router.get('/', authCheck(['admin', 'user']), ctrl.getAllSchedules)
router.post('/', authCheck(['admin']), ctrl.addSchedule)
router.put('/:schedule_id', authCheck(['admin']), ctrl.updateSchedule)
router.delete('/:schedule_id', authCheck(['admin']), ctrl.deleteSchedule)

module.exports = router
