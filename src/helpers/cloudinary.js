const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

cloudinary.uploadFile = async (filename) => {
  const upload = await cloudinary.uploader.upload(filename, {
    folder: 'tickitz_movie',
    use_filename: true,
    unique_filename: false
  })
  return upload
}

cloudinary.destroyFile = async (movie) => {
  const filename = `tickitz${
    movie.rows[0].img
      .split('tickitz')[1]
      .split('.png')[0]
      .split('.jpg')[0]
      .split('.jpeg')[0]
  }`
  await cloudinary.uploader.destroy(filename, (result) => {
    console.log(result)
  })
}

module.exports = cloudinary
