const express = require('express');
const {
  getBookings,
  addBooking,
  deleteBooking,
} = require('../controllers/bookingController');
const authenticated = require('../middlewares/authenticated');
const mapBooking = require('../helpers/mapBooking');
const Booking = require('../models/Booking');
const router = express.Router();

router.get('/', authenticated, async (req, res) => {
  const bookings = await getBookings();
  res.send({ payload: bookings.map(mapBooking) });
});

router.post('/', authenticated, async (req, res) => {
  const booking = await addBooking(req.user._id, req.body.roomId);
  res.send({ payload: mapBooking(booking) });
});

router.delete('/:id', authenticated, async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) return res.status(404).send({ error: 'Бронь не найдена' });

  if (String(booking.userId) !== String(req.user._id)) {
    return res.send({ error: 'Нет доступа' });
  }

  await deleteBooking(req.params.id);
  res.send({ error: null });
});

module.exports = router;
