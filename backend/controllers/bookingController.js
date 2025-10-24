const Booking = require('../models/Booking');

function getBookings() {
  return Booking.find().populate('roomId').populate('userId');
}

function addBooking(userId, roomId) {
  return Booking.create({ userId, roomId });
}

function deleteBooking(id) {
  return Booking.deleteOne({ _id: id });
}

module.exports = { getBookings, addBooking, deleteBooking };
