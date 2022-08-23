const model = {}
const db = require('../config/db')

model.addSchedule = async (data) => {
  try {
    await db.query(
      'INSERT INTO public.schedules (movie_id, show_date, city, theater, address, show_time, price) VALUES($1, $2, $3, $4, $5, $6, $7)',
      [
        data.movie_id,
        data.show_date,
        data.city,
        data.theater,
        data.address,
        data.show_time,
        data.price
      ]
    )
    return 'data berhasil disimpan'
  } catch (error) {
    return error
  }
}

model.getAllSchedules = async () => {
  try {
    const query = await db.query(
      'SELECT * FROM public.schedules ORDER BY schedule_id DESC'
    )
    return query.rows
  } catch (error) {
    return error
  }
}

model.getScheduleById = async (data) => {
  try {
    const query = await db.query(
      'SELECT * FROM public.schedules WHERE schedule_id=$1',
      [data.schedule_id]
    )
    return query.rows
  } catch (error) {
    return error
  }
}

model.updateSchedule = async (data) => {
  try {
    await db.query(
      `UPDATE public.schedules
        SET movie_id=COALESCE(NULLIF($1, ''), movie_id),
            show_date=COALESCE(NULLIF($2, CURRENT_DATE), show_date),
            city=COALESCE(NULLIF($3, ''), city),
            theater=COALESCE(NULLIF($4, ''), theater),
            address=COALESCE(NULLIF($5, ''), address),
            show_time=COALESCE(NULLIF($6, ''), show_time),
            price=COALESCE(NULLIF($7, ''), price),
            updated_at=now()
        WHERE schedule_id=$8`,
      [
        data.movie_id,
        data.show_date,
        data.city,
        data.theater,
        data.address,
        data.show_time,
        data.price,
        data.schedule_id
      ]
    )
    return 'data berhasil diubah'
  } catch (error) {
    return error
  }
}

model.deleteSchedule = async (data) => {
  try {
    await db.query('DELETE FROM public.schedules WHERE schedule_id=$1', [
      data.schedule_id
    ])
    return 'data berhasil dihapus'
  } catch (error) {
    return error
  }
}

module.exports = model
