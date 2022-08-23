const express = require('express')
const router = express.Router()
const authCheck = require('../middlewares/authCheck')
const ctrl = require('../controllers/movies')
const upload = require('../middlewares/upload')

router.get('/search', authCheck(['admin', 'user']), ctrl.searchMovie)
router.get('/', authCheck(['admin', 'user']), ctrl.getAllMovies)
router.post('/', authCheck(['admin']), upload.single('img'), ctrl.addMovie)
router.put(
  '/:movie_id',
  authCheck(['admin']),
  upload.single('img'),
  ctrl.updateMovie
)
router.delete('/:movie_id', authCheck(['admin']), ctrl.deleteMovie)

module.exports = router
