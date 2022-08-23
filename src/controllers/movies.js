const ctrl = {}
const model = require('../models/movies')
const response = require('../helpers/response')

ctrl.addMovie = async (req, res) => {
  try {
    if (req.decode.role === 'admin') {
      const data = await model.addMovie({ ...req.body, ...req.file })
      return response(res, 201, data)
    } else {
      return response(res, 401, 'Anda tidak memiliki akses', true)
    }
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.getAllMovies = async (req, res) => {
  try {
    const pagination = {
      page: req.query.page || 1,
      limit: req.query.limit || 5,
      order: req.query.order
    }
    const rows = await model.countRows()
    console.log(rows)
    const data = await model.getAllMovies(pagination)
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.searchMovie = async (req, res) => {
  try {
    const data = await model.searchMovie(req.query)
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.updateMovie = async (req, res) => {
  try {
    if (req.decode.role === 'admin') {
      const data = await model.updateMovie({
        ...req.params,
        ...req.body,
        ...req.file
      })
      return response(res, 200, data)
    } else {
      return response(res, 401, 'Anda tidak memiliki akses', true)
    }
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.deleteMovie = async (req, res) => {
  try {
    if (req.decode.role === 'admin') {
      const data = await model.deleteMovie(req.params)
      return response(res, 200, data)
    } else {
      return response(res, 401, 'Anda tidak memiliki akses', true)
    }
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

module.exports = ctrl
