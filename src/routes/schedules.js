const express = require('express')
const router = express.Router()
const authCheck = require('../middlewares/authCheck')
const ctrl = require('../controllers/schedules')

router.get('/:schedule_id', authCheck, ctrl.getScheduleById)
router.get('/', authCheck, ctrl.getAllSchedules)
router.post('/', authCheck, ctrl.addSchedule)
router.put('/:schedule_id', authCheck, ctrl.updateSchedule)
router.delete('/:schedule_id', authCheck, ctrl.deleteSchedule)

module.exports = router
