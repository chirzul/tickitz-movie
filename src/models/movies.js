const model = {}
const db = require('../config/db')
const format = require('pg-format')
const cloudinary = require('../middlewares/cloudinary')

model.addMovie = async (data) => {
  try {
    const upload = await cloudinary.uploader.upload(data.path, {
      folder: 'tickitz_movie',
      use_filename: true,
      unique_filename: false
    })
    await db.query(
      'INSERT INTO public.movies (title, genres, release_date, duration, director, casts, synopsis, img) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
      [
        data.title,
        data.genres,
        data.release_date,
        data.duration,
        data.director,
        data.casts,
        data.synopsis,
        upload.secure_url
      ]
    )
    return 'data berhasil disimpan'
  } catch (error) {
    return error
  }
}

model.getAllMovies = async (pagination) => {
  try {
    let queryTemp = format(
      'SELECT movie_id, img, title, genres, release_date FROM public.movies'
    )

    if (pagination.order) {
      queryTemp = format(`${queryTemp} ORDER BY %s`, pagination.order)
    } else {
      queryTemp = format(`${queryTemp} ORDER BY movie_id DESC`)
    }

    const offset = (pagination.page - 1) * pagination.limit
    queryTemp = format(
      `${queryTemp} LIMIT %s OFFSET %s`,
      pagination.limit,
      offset
    )

    const query = await db.query(queryTemp)

    return query.rows
  } catch (error) {
    return error
  }
}

model.searchMovie = async (data) => {
  try {
    const query = await db.query(
      'SELECT * FROM public.movies WHERE LOWER(title) LIKE LOWER($1)',
      [`%${data.title}%`]
    )
    return query.rows
  } catch (error) {
    return error
  }
}

model.updateMovie = async (data) => {
  try {
    let img = ''
    if (data.path) {
      img = await db.query('SELECT * FROM public.movies WHERE movie_id=$1', [
        data.movie_id
      ])
      img = `tickitz${
        img.rows[0].img
          .split('tickitz')[1]
          .split('.png')[0]
          .split('.jpg')[0]
          .split('.jpeg')[0]
      }`
      await cloudinary.uploader.destroy(img, (result) => {
        console.log(result)
      })
      const upload = await cloudinary.uploader.upload(data.path, {
        folder: 'tickitz_movie',
        use_filename: true,
        unique_filename: false
      })
      img = upload.secure_url
    }
    await db.query(
      `UPDATE public.movies
        SET title=COALESCE(NULLIF($1, ''), title),
            genres=COALESCE(NULLIF($2, ''), genres),
            release_date=COALESCE(NULLIF($3, CURRENT_DATE), release_date),
            duration=COALESCE(NULLIF($4, ''), duration),
            director=COALESCE(NULLIF($5, ''), director),
            casts=COALESCE(NULLIF($6, ''), casts),
            synopsis=COALESCE(NULLIF($7, ''), synopsis),
            img=COALESCE(NULLIF($8, ''), img),
            updated_at=now()
        WHERE movie_id=$9`,
      [
        data.title,
        data.genres,
        data.release_date,
        data.duration,
        data.director,
        data.casts,
        data.synopsis,
        img,
        data.movie_id
      ]
    )
    return 'data berhasil diubah'
  } catch (error) {
    return error
  }
}

model.countRows = async () => {
  try {
    const rows = await db.query('SELECT COUNT(movie_id) FROM public.movies')
    return rows.rows[0].count
  } catch (error) {
    return error
  }
}

model.deleteMovie = async (data) => {
  try {
    let img = await db.query('SELECT * FROM public.movies WHERE movie_id=$1', [
      data.movie_id
    ])
    img = `tickitz${
      img.rows[0].img
        .split('tickitz')[1]
        .split('.png')[0]
        .split('.jpg')[0]
        .split('.jpeg')[0]
    }`
    console.log(img)
    await cloudinary.uploader.destroy(img, (result) => {
      console.log(result)
    })
    await db.query('DELETE FROM public.movies WHERE movie_id=$1', [
      data.movie_id
    ])
    return 'data berhasil dihapus'
  } catch (error) {
    return error
  }
}

module.exports = model
