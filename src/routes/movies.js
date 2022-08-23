const express = require('express')
const router = express.Router()
const authCheck = require('../middlewares/authCheck')
const ctrl = require('../controllers/movies')
const upload = require('../middlewares/upload')

router.get('/search', authCheck, ctrl.searchMovie)
router.get('/', authCheck, ctrl.getAllMovies)
router.post('/', authCheck, upload.single('img'), ctrl.addMovie)
router.put('/:movie_id', authCheck, upload.single('img'), ctrl.updateMovie)
router.delete('/:movie_id', authCheck, ctrl.deleteMovie)

module.exports = router
