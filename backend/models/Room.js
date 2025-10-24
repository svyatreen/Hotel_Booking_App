const mongoose = require('mongoose');
const validator = require('validator');

const RoomSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
      validate: validator.isURL,
    },
    content: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
