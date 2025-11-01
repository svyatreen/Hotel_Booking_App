const express = require('express');
const {
  getRooms,
  getRoom,
  addRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const roles = require('../constants/roles');
const mapRoom = require('../helpers/mapRoom');
const Booking = require('../models/Booking');

const router = express.Router();

router.get('/available', async (req, res) => {
  const allRooms = await getRooms();
  const bookings = await Booking.find();
  const bookedRoomIds = bookings.map((b) => String(b.roomId));

  const availableRooms = allRooms.filter(
    (room) => !bookedRoomIds.includes(String(room._id))
  );

  res.send({ payload: availableRooms.map(mapRoom) });
});

router.get('/', async (req, res) => {
  const rooms = await getRooms();
  res.send({ payload: rooms.map(mapRoom) });
});

router.get('/:id', async (req, res) => {
  const room = await getRoom(req.params.id);
  res.send({ payload: mapRoom(room) });
});

router.post('/', authenticated, hasRole([roles.ADMIN]), async (req, res) => {
  const room = await addRoom(req.body);
  res.send({ payload: mapRoom(room) });
});

router.patch(
  '/:id',
  authenticated,
  hasRole([roles.ADMIN]),
  async (req, res) => {
    const room = await updateRoom(req.params.id, req.body);
    res.send({ payload: mapRoom(room) });
  }
);

router.delete(
  '/:id',
  authenticated,
  hasRole([roles.ADMIN]),
  async (req, res) => {
    await deleteRoom(req.params.id);
    res.send({ error: null });
  }
);

module.exports = router;
