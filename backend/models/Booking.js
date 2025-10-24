const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
