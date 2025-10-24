const Room = require('../models/Room');
const Booking = require('../models/Booking');

function getRooms() {
  return Room.find().sort({ cost: 1 });
}

function getRoom(id) {
  return Room.findById(id);
}

function addRoom(data) {
  return Room.create(data);
}

function updateRoom(id, data) {
  return Room.findByIdAndUpdate(id, data, { returnDocument: 'after' });
}

async function deleteRoom(id) {
  await Booking.deleteMany({ roomId: id });

  return Room.deleteOne({ _id: id });
}

module.exports = { getRooms, getRoom, addRoom, updateRoom, deleteRoom };
