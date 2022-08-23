const model = {}
const db = require('../config/db')

model.addBooking = async (data) => {
  try {
    await db.query(
      `INSERT INTO public.bookings
        (schedule_id, user_id, seats)
        VALUES($1, $2, $3)`,
      [data.schedule_id, data.user_id, data.seats]
    )
    return 'data berhasil disimpan'
  } catch (error) {
    return error
  }
}

model.getAllBookings = async () => {
  try {
    const query = await db.query(
      'SELECT * FROM public.bookings ORDER BY booking_id DESC'
    )
    return query.rows
  } catch (error) {
    return error
  }
}

model.getBookingById = async (data) => {
  try {
    const query = await db.query(
      'SELECT * FROM public.bookings WHERE booking_id=$1',
      [data.booking_id]
    )
    return query.rows
  } catch (error) {
    return error
  }
}

model.updateBooking = async (data) => {
  try {
    await db.query(
      `UPDATE public.bookings
        SET schedule_id=COALESCE(NULLIF($1, ''), schedule_id),
            user_id=COALESCE(NULLIF($2, ''), user_id),
            seats=COALESCE(NULLIF($3, ''), seats),
            updated_at=now()
        WHERE booking_id=$4`,
      [data.schedule_id, data.user_id, data.seats, data.booking_id]
    )
    return 'data berhasil diubah'
  } catch (error) {
    return error
  }
}

model.deleteSchedule = async (data) => {
  try {
    await db.query('DELETE FROM public.bookings WHERE booking_id=$1', [
      data.booking_id
    ])
    return 'data berhasil dihapus'
  } catch (error) {
    return error
  }
}

module.exports = model
